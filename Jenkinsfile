pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    IMAGE_NAME = 'vivek2707/my-react-app'
  }
  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/Cali-ver/ujjwala-mithala.git'
      }
    }
    stage('Docker Build') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
        sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
      }
    }
    stage('Docker Push') {
      steps {
        sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
        sh "docker push ${IMAGE_NAME}:latest"
      }
    }
    stage('Deploy') {
      steps {
        sh """
          docker stop react-app || true
          docker rm react-app || true
          docker run -d --name react-app -p 80:80 ${IMAGE_NAME}:latest
        """
      }
    }
  }
  post {
    success { echo '✅ Build Successful!' }
    failure { echo '❌ Build Failed!' }
  }
}