pipeline {
    agent none  // Disable the global agent definition

    environment {
        DOCKER_REGISTRY = 'haunt14'  // Your Docker registry (without https://)
        DOCKER_IMAGE_NAME_REACT = 'jenkin-docker-nodejs-frontend'  // Your Docker image name
        DOCKER_IMAGE_NAME_JAVA = 'jenkin-docker-java-backend'  // Your Docker image name
        DOCKER_CREDENTIALS = '0385934297'  // Jenkins credentials ID for Docker login
    }

    parameters {
        string(name: 'AGENT_JS_LABEL', defaultValue: 'nodejs-agent', description: 'The label of the Jenkins agent to use')
        string(name: 'AGENT_JV_LABEL', defaultValue: 'java-agent', description: 'The label of the Jenkins agent to use')
    }

    stages {
        stage('Checkout') {
            agent { label "${params.AGENT_LABEL}" }  // Dynamically select agent based on parameter
            steps {
                // Checkout the code from the Git repository
                sh 'echo test github webhook 4'
                sh 'mkdir -p /home/java-git && cd /home/java-git && git clone https://github.com/HauNT1409021997/backend-spring.git'
                sh 'mkdir -p /home/javascript-git && cd /home/javascript-git && git clone https://github.com/HauNT1409021997/frontend-react.git'
                sh 'sudo gpasswd -a jenkins docker'
                sh 'sudo usermod -aG docker jenkins'
            }
        }

        stage('Get Commit ID') {
            parallel{
                stage('Get Commit ID of BE') {
                    agent { label "${params.AGENT_LABEL}" }  // Dynamically select agent based on parameter
                    steps {
                        script {
                            // Get the commit ID using `git log --oneline` (first 7 characters of the hash)
                            env.GIT_COMMIT_ID = sh(script: 'git log --oneline -n 1 | awk \'{print $1}\'', returnStdout: true).trim()
                            echo "Commit ID: ${env.GIT_COMMIT_ID}"
                        }
                    }
                }

            }
        }

        stage('Login to Docker Registry') {
            agent { label "${params.AGENT_LABEL}" }  // Dynamically select agent based on parameter
            steps {
                script {
                    // Use docker.withRegistry to handle login with credentials securely
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS}") {
                        // This block will run within the context of the login to the Docker registry
                        echo 'Successfully logged in to Docker registry'
                    }
                }
            }
        }

        stage('Build, Tag & Push Docker Image') {
            agent { label "${params.AGENT_LABEL}" }  // Dynamically select agent based on parameter
            steps {
                script {
                    // Build the Docker image using the commit ID as the tag
                    def customImageReact = docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME_REACT}:${env.GIT_COMMIT_ID}")
                    def customImageNginx = docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME_NGINX}:${env.GIT_COMMIT_ID}")
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS}") {
                        // This block will run within the context of the login to the Docker registry
                        echo 'Successfully logged in to Docker registry'

                        // Push both the commit ID and "latest" tagged images
                        customImageReact.push("${env.GIT_COMMIT_ID}")  // Push commit ID tagged image

                        customImageNginx.push("${env.GIT_COMMIT_ID}")  // Push commit ID tagged image
                    }
                }
            }
        }

//         stage('Clean Up') {
//             agent { label "${params.AGENT_LABEL}" }  // Dynamically select agent based on parameter
//             steps {
//                 script {
//                     // Remove the local Docker images to free up space
//                     def customImage = docker.image("${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${env.GIT_COMMIT_ID}")
//                     customImage.remove()
//                 }
//             }
//         }
    }

    post {
        always {
            // Cleanup or any other final steps can be placed here
            echo "Pipeline completed"
        }
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
