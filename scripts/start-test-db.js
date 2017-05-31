const shell = require('shelljs');

const checkDocker = () => {
    return shell.exec('docker inspect --format \'{{.State.Health.Status}}\' dbtest', { silent: true }).stdout.indexOf('healthy') > -1;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const startTestDBDocker = () => {
    console.log("Starting testdb docker...");
    shell.exec("docker-compose -f docker-compose.e2e.yml up -d", { silent: true });
}

const waitForDockerToBeUpAndRunning = async () => {
    console.log("Doing health checks until the docker container is done...")
    let dockerDone = checkDocker();
    while (!dockerDone) {
        await sleep(3000);
        dockerDone = checkDocker();
        console.log("Health check done: " + dockerDone);
    }
    return Promise.resolve();
}

const main = async () => {
    startTestDBDocker();
    await waitForDockerToBeUpAndRunning();
}

main();