pipeline {
  tools {
    nodejs "14.0.0"
  }
  stage('SCM') {
    checkout scm
  }
  stage('node') {
    sh "node -v"
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScannerTest';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
