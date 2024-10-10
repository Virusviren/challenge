function minContainers(shipments, containerLimits) {
    let containersUsed = 0;
    let remainingCapacity = 0;

    for (let i = 0; i < shipments.length; i++) {
        if (shipments[i] > remainingCapacity) {
            containersUsed++;
            remainingCapacity = Math.max(...containerLimits);
            if (shipments[i] > remainingCapacity) {
                return -1;
            }
        }
        remainingCapacity -= shipments[i];
    }

    return containersUsed;
}


const shipments = [10, 20, 30];
const containerLimits = [15, 15, 20, 10];
console.log(minContainers(shipments, containerLimits)); // Output: 4