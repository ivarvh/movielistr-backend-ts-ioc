const shell = require('shelljs');

const executeE2ETests = () => {
    console.log("Executing e2e tests...");
    shell.exec("mocha -r ts-node/register e2e/**/*.spec.ts");
}

executeE2ETests();
