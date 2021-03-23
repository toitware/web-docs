pipeline {
    agent {
      kubernetes {
        defaultContainer 'webtemplate'
        yamlFile 'Jenkins.pod.yaml'
      }
    }

    environment {
        GITHUB_TOKEN = credentials('leon-github-npm')
        BUILD_VERSION = sh(returnStdout: true, script: 'gitversion').trim()
    }

    options {
      timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage("install") {
            steps {
                sh 'npm config set //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN'
                sh "yarn install"
            }
        }

        stage("lint") {
            steps {
                sh "yarn lint"
            }
        }

        stage("test") {
            steps {
                sh "yarn test:jenkins"
            }
            post {
                always {
                    junit "junit.xml"
                }
            }
        }

        stage("build") {
            steps {
                sh "yarn build"
            }
        }

        stage("upload") {
            when {
                anyOf {
                    branch 'master'
                    branch pattern: "release-v\\d+.\\d+", comparator: "REGEXP"
                    tag "v*"
                }
            }
            steps {
                sh "tar -zcf ${BUILD_VERSION}.tgz -C build ."
                withCredentials([[$class: 'FileBinding', credentialsId: 'gcloud-service-auth', variable: 'GOOGLE_APPLICATION_CREDENTIALS']]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh "gcloud config set project infrastructure-220307"
                    sh "toitarchive ${BUILD_VERSION}.tgz toit-web docsv2.toit.io ${BUILD_VERSION}"
                }
            }
            post {
                always {
                    sh "rm -rf ./build/"
                }
            }
        }
    }
}
