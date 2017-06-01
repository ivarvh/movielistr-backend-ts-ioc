import { exec, ExecOutputReturnValue } from "shelljs";

const checkDocker = (): boolean => {
    const result: ExecOutputReturnValue = exec("docker inspect --format '{{.State.Health.Status}}' dbtest", { silent: true }) as ExecOutputReturnValue;
    return result.stdout.indexOf("healthy") > -1;
};

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const startTestDBDocker = (): void => {
    console.log("Starting testdb docker...");
    exec("docker-compose -f docker-compose.e2e.yml up -d", { silent: true });
};

const waitForDockerToBeUpAndRunning = async (): Promise<void> => {
    console.log("Doing health checks until the docker container is done...");
    let dockerDone = checkDocker();
    while (!dockerDone) {
        await sleep(3000);
        dockerDone = checkDocker();
        console.log("Docker started: " + dockerDone);
    }
    return Promise.resolve();
};

const main = async () => {
    startTestDBDocker();
    await waitForDockerToBeUpAndRunning();
};

main();
