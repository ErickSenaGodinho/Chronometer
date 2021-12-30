class Unit {
    constructor(config) {
        this.value = config.value || 0;
        this.maxValue = config.maxValue || null;
        this.hasLimit = config.hasLimit || false;
        this.element = config.element;
    }

    restartValues() {
        this.value = 0;
        this.element.innerHTML = "00";
    }
}
