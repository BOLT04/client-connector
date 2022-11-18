node {
  stage('SCM') {
    checkout scm
  }
  stage('install') {
    steps {
      sh 'npm install' 
    }
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScannerTest';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
