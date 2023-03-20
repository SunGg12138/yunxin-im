const scanner = require('sonarqube-scanner');

// The URL of the SonarQube server. Defaults to http://localhost:9000
const serverUrl = process.env.SONARQUBE_URL || 'https://5940cq2570.zicp.fun';

// The token used to connect to the SonarQube/SonarCloud server. Empty by default.
const token = process.env.SONARQUBE_TOKEN || 'sqp_ad20a1cd011117a6972593d66c4183b9c8334b1b';

// projectKey must be unique in a given SonarQube instance
const projectKey = process.env.SONARQUBE_PROJECTKEY || 'SunGg12138_yunxin-im_AYb80slZmABvBwX5jtnJ';

// options Map (optional) Used to pass extra parameters for the analysis.
// See the [official documentation](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) for more details.
const options = {

  'sonar.projectKey': projectKey,

  // projectName - defaults to project key
  'sonar.projectName': 'yunxin-im',

  // Path is relative to the sonar-project.properties file. Defaults to .
  'sonar.sources': 'src',

  // source language
  'sonar.language': 'javascript',

  'sonar.javascript.lcov.reportPaths' : 'coverage/lcov.info',

  // Encoding of the source code. Default is default system encoding
  'sonar.sourceEncoding': 'UTF-8',

  // 'analysis.mode': 'incremental',
};

// parameters for sonarqube-scanner
const params = {
  serverUrl,
  token,
  options
}

const sonarScanner = async () => {

  console.log(serverUrl);

  if (!serverUrl) {
    console.log('SonarQube url not set. Nothing to do...');
    return;
  }

  //  Function Callback (the execution of the analysis is asynchronous).
  const callback  = (result) => {
    console.log('Sonarqube scanner result:', result);
  }

  scanner(params, callback);
}

sonarScanner()
  .catch(err => console.error('Error during sonar scan', err));
