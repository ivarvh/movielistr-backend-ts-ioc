const shell = require('shelljs');

const stopAndRemoveDockerContainer = () => {
    console.log("Stopping and removing the docker container...");
    shell.exec("docker stop dbtest && docker rm dbtest", { silent: true });
}

stopAndRemoveDockerContainer();