const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require("child_process");
const fs = require('fs');
// fs.copyFile('source.txt', 'destination.txt', (err) => {
//     if (err) throw err;
//     console.log('source.txt was copied to destination.txt');
//   });

try {
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