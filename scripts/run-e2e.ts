import { exec } from "shelljs";

const executeE2ETests = () => {
    console.log("Executing e2e tests...");
    exec("mocha -r ts-node/register e2e/**/*.spec.ts");
};

executeE2ETests();
