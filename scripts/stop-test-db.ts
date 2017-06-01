import { exec } from "shelljs";

const stopAndRemoveDockerContainer = () => {
    console.log("Stopping and removing the docker container...");
    exec("docker stop dbtest && docker rm dbtest", { silent: true });
};

stopAndRemoveDockerContainer();
