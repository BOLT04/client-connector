pipeline {
  tools {
    nodejs "14.0.0"
  }
  stages {
    stage('SCM') {
      steps {
        checkout scm
      }
    }
    stage('node') {
      steps {
        sh "node -v"
      }
    }
    stage('SonarQube Analysis') {
      steps {
        def scannerHome = tool 'SonarScannerTest';
        withSonarQubeEnv() {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
  }
}
