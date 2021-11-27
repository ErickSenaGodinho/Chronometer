let hour = new Unit({
    element: document.querySelector("span.hour")
});
let min = new Unit({
    maxValue: 60,
    hasLimit: true,
    element: document.querySelector("span.min")
});
let seg = new Unit({
    maxValue: 60,
    hasLimit: true,
    element: document.querySelector("span.seg")
});
let mil = new Unit({
    maxValue: 60,
    hasLimit: true,
    element: document.querySelector("span.mil")
});

const units = [hour, min, seg, mil]

const states = {
    STOPPED: "stopped",
    RUNNING: "running",
}

let currentState = states.STOPPED

const principalButtonStates = {
    STARTED: "started",
    STOPPED: "stopped",
    RESTARTED: "restarted"
}

let currentPrincipalButtonState = principalButtonStates.RESTARTED

let buttons = document.querySelector(".buttons")
let principalButton = document.querySelector(".principal-button")
let restartButton = document.querySelector(".restart-button")

let worker = new Worker('worker.js')

onload = () => {
    restartButton.disabled = true
}

principalButton.onclick = () => checkPrincipalButton()

function checkPrincipalButton() {
    if (principalButton.classList.contains(principalButtonStates.RESTARTED) || principalButton.classList.contains(principalButtonStates.STARTED)) {
        if (principalButton.classList.contains(principalButtonStates.RESTARTED)) {
            changeButtonState()
        }
        updatePrincipalButtonState(principalButtonStates.STOPPED, "STOP")
        start()
    } else {
        updatePrincipalButtonState(principalButtonStates.STARTED, "START")
        stop()
    }
    restartButton.disabled = false
}

function updatePrincipalButtonState(newPrincipalButtonState, text) {
    principalButton.classList.replace(currentPrincipalButtonState, newPrincipalButtonState)
    currentPrincipalButtonState = newPrincipalButtonState
    principalButton.innerText = text
}

function start() {
    stop()
    worker.postMessage('start')
    worker.onmessage = (e) => {
        timer()
    }
}

function changeButtonState() {
    let newState = currentState === states.STOPPED ? states.RUNNING : states.STOPPED
    buttons.classList.replace(currentState, newState)
    currentState = newState
}

function stop() {
    worker.postMessage('stop')
}

restartButton.onclick = () => restart()

function restart() {
    updatePrincipalButtonState(principalButtonStates.RESTARTED, "START")
    restartButton.disabled = true

    changeButtonState()
    stop()

    units.forEach(element => {
        element.restartValues()
    });
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