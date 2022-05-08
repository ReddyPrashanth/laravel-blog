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
                sh "rm -f application/.env"
                sh "cp application/.env.example application/.env"
                sh "sed -i 's/DB_DATABASE=laravel/DB_HOST=${DB_DATABASE}/g' application/.env"
                sh "sed -i 's/DB_USERNAME=root/DB_HOST=${DB_USERNAME}/g' application/.env"
                sh "sed -i 's/DB_HOST=127.0.0.1/DB_HOST=${DB_HOST}/g' application/.env"
                sh "sed -i 's/DB_PASSWORD=/DB_HOST=${DB_PASSWORD}/g' application/.env"
            }
        }
        stage("Test") {
            steps{
                sh 'echo "Environment setup is complete"'
            }
        }
    }
}