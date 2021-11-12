let hour = {
    value: 00,
    maxValue: null,
    hasLimit: false,
    element: document.querySelector("span.hour")
}
let min = {
    value: 00,
    maxValue: 60,
    hasLimit: true,
    element: document.querySelector("span.min")
}
let seg = {
    value: 0,
    maxValue: 60,
    hasLimit: true,
    element: document.querySelector("span.seg")
}
let mil = {
    value: 0,
    maxValue: 100,
    hasLimit: true,
    element: document.querySelector("span.mil")
}

let startButton = document.querySelector("button.start")
let stopButton = document.querySelector("button.stop")
let restartButton = document.querySelector("button.restart")

let worker = new Worker('worker.js')

startButton.onclick = () => start()

function start() {
    stop()
    worker.postMessage('start')
    worker.onmessage = (e) => {
        timer()
    }
}

stopButton.onclick = () => stop()

function stop() {
    worker.postMessage('stop')
}

restartButton.onclick = () => restart()

function restart() {
    stop()

    hour.value = 0
    hour.element.innerHTML = "00"

    min.value = 0
    min.element.innerHTML = "00"

    seg.value = 0
    seg.element.innerHTML = "00"

    mil.value = 0
    mil.element.innerHTML = "00"
}

function timer() {
    mil.value++
    mil.element.innerHTML = updateTime(mil, seg);
    seg.element.innerHTML = updateTime(seg, min);
    min.element.innerHTML = updateTime(min, hour);
    hour.element.innerHTML = updateTime(hour, null);
}

function updateTime(unit, nextUnit) {
    if (unit.value <= 9) {
        return `0${unit.value}`
    } else if (unit.value < unit.maxValue || !unit.hasLimit) {
        return unit.value;
    } else {
        unit.value = 0;
        nextUnit.value++;
        return "00";
    }
}