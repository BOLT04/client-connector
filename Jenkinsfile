pipeline {
  agent any
  tools {
    nodejs "node"
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
           script {
                def scannerHome = tool 'SonarScannerTest';
                withSonarQubeEnv('SonarScannerTest') {
                  sh "${scannerHome}/bin/sonar-scanner"
                }
           }
      }
    }
  }
}
