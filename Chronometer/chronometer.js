let min = 0
let seg = 0
let mil = 0

let startButton = document.querySelector("button.start")
let stopButton = document.querySelector("button.stop")
let restartButton = document.querySelector("button.restart")

let minElement = document.querySelector("span.min")
let segElement = document.querySelector("span.seg")
let milElement = document.querySelector("span.mil")

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
    min = 0
    seg = 0
    mil = 0

    minElement.innerHTML = "00"
    segElement.innerHTML = "00"
    milElement.innerHTML = "00"
}

function timer() {
    mil++

    if (mil <= 9) {
        milElement.innerHTML = `0${mil}`
    } else if (mil < 99) {
        milElement.innerHTML = mil
    } else {
        mil = 0
        milElement.innerHTML = `0${mil}`
        seg++
    }

    if (seg <= 9) {
        segElement.innerHTML = `0${seg}`
    } else if (seg < 60) {
        segElement.innerHTML = seg
    } else {
        seg = 0
        segElement.innerHTML = `0${seg}`
        min++
    }

    if (min <= 9) {
        minElement.innerHTML = `0${min}`
    } else {
        minElement.innerHTML = min
    }
}