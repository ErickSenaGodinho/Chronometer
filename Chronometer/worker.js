var interval
onmessage = (e) => {
    switch (e.data) {
        case 'start':
            interval = setInterval(() => {
                postMessage('')
            }, 10);
            break;
        case 'stop':
            console.log(interval)
            clearInterval(interval)
            break;
    }
}