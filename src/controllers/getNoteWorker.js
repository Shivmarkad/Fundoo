const { parentPort, workerData } = require('worker_threads');
const  {title}  = workerData;

function capitalizeWords(inputString) {
    return inputString
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

const result = capitalizeWords(title)
parentPort.postMessage({ result });
