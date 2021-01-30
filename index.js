const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require("child_process");
const fs = require('fs');
const YAML = require('yaml');


try {
  const file = fs.readFileSync('../.github/actions/gambuzzi/ga-compile-pipeline/pipeline/pipeline.yaml', 'utf8');
  const pipeline = YAML.parse(file);
  
  const program = core.getInput('program');
  const registry = core.getInput('registry');
  const img_name = core.getInput('img_name');
  const maintainer = core.getInput('maintainer');
  const owner = core.getInput('owner');

  pipeline.env.PROGRAM = program;
  pipeline.env.REGISTRY = registry;
  pipeline.env.IMG_NAME = img_name;
  pipeline.env.MAINTAINER = maintainer;
  pipeline.env.OWNER = owner;

  fs.writeFileSync('.github/workflows/pipeline.yaml', YAML.stringify(pipeline));
  // fs.copyFile('../.github/actions/gambuzzi/ga-compile-pipeline/pipeline/pipeline.yaml', '.github/workflows/pipeline.yaml', (err) => {
  //   if (err) throw err;
  //   console.log('../.github/actions/gambuzzi/ga-compile-pipeline/pipeline/pipeline.yaml was copied to .github/workflows/pipeline.yaml');
  // });

  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  [
    `git config --global user.name '${github.context.payload.head_commit.author.name}'`,
    `git config --global user.email '${github.context.payload.head_commit.author.email}'`,
    'echo "# `date`" >> .github/workflows/pipeline.yaml',
    'git add -f .github/workflows/pipeline.yaml',
    'git commit -m "Automated pipeline build for (`git log -1 --pretty=format:"%s"`)"',
    'git push'
  ].map((x) => {
    exec(x, (error, stdout, stderr) => {
      console.log(x);
      if (error) {
        console.log(`error: ${error.message}`);
        throw error;        
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });
} catch (error) {
  core.setFailed(error.message);
}