node {
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
