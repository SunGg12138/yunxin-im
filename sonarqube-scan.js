const scanner = require('sonarqube-scanner');

const serverUrl = process.env.SONARQUBE_URL || 'http://localhost:9000';
const token = process.env.SONARQUBE_TOKEN || 'sqp_453bf394a4488de07719330b0b1ab5b3b13b5e42';
const projectKey = process.env.SONARQUBE_PROJECTKEY || 'pigeon';
const projectName = process.env.SONARQUBE_PROJECTNAME || 'pigeon';

const options = {
  'sonar.projectKey': projectKey,
  'sonar.projectName': projectName,
  'sonar.sources': 'src',
  'sonar.language': 'javascript',
  'sonar.javascript.lcov.reportPaths' : 'coverage/lcov.info',
  'sonar.sourceEncoding': 'UTF-8',
  'analysis.mode': 'incremental',
  'sonar.projectVersion': '1.0.1',
};

const params = {
  serverUrl,
  token,
  options
};

const sonarScanner = async () => {
  console.log(serverUrl);

  if (!serverUrl) {
    console.log('SonarQube url not set. Nothing to do......');
    return;
  }

  const callback  = (result) => {
    console.log('Sonarqube scanner result:', result);
  }

  scanner(params, callback);
}

sonarScanner()
  .catch(err => console.error('Error during sonar scan', err));
