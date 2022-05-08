pipeline {
    agent any
    stages {
        stage("Prepare") {
            steps {
              checkout([$class: 'GitSCM', 
                branches: [[name: '*/master']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [[$class: 'CleanCheckout']],
                submoduleCfg: [], 
                userRemoteConfigs: [[url: 'https://github.com/ReddyPrashanth/laravel-blog.git']]])
              sh "ls -ltr"
            }
        }
        stage("Build") {
            environment {
                DB_HOST = 'database'
                DB_DATABASE = 'laravel_blog'
                DB_USERNAME = 'laraveluser'
                DB_PASSWORD = 'secret'
            }
            steps {
                sh 'rm -f application/.env'
                sh 'cp application/.env.example application/.env'
                sh 'echo DB_HOST=${DB_HOST} >> application/.env'
                sh 'echo DB_USERNAME=${DB_USERNAME} >> application/.env'
                sh 'echo DB_DATABASE=${DB_DATABASE} >> application/.env'
                sh 'echo DB_PASSWORD=${DB_PASSWORD} >> application/.env'
            }
        }
        stage("Test") {
            steps{
                sh 'echo "Environment setup is complete"'
            }
        }
    }
}