const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require("child_process");
const fs = require('fs');


try {
  fs.copyFile('../.github/actions/gambuzzi/ga-compile-pipeline/pipeline/pipeline.yaml', '.github/workflows/pipeline.yaml', (err) => {
    if (err) throw err;
    console.log('../.github/actions/gambuzzi/ga-compile-pipeline/pipeline/pipeline.yaml was copied to .github/workflows/pipeline.yaml');
  });

  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  const buildCommand = core.getInput('build');
  console.log(`BuildCommand ${buildCommand}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}