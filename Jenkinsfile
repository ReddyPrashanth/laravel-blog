pipeline {
    agent any
    environment {
        APP_VERSION = 0.1
        DB_HOST = 'database'
        DB_DATABASE = 'laravel_blog'
        DB_USERNAME = 'laraveluser'
        DB_PASSWORD = 'secret'
    }
    stages {
        stage("Build") {
            steps {
                sh "rm -f application/.env"
                sh "cp application/.env.example application/.env"
                sh "sed -i 's/DB_DATABASE=laravel/DB_DATABASE=${DB_DATABASE}/g' application/.env"
                sh "sed -i 's/DB_USERNAME=root/DB_USERNAME=${DB_USERNAME}/g' application/.env"
                sh "sed -i 's/DB_HOST=127.0.0.1/DB_HOST=${DB_HOST}/g' application/.env"
                sh "sed -i 's/DB_PASSWORD=/DB_PASSWORD=${DB_PASSWORD}/g' application/.env"
                sh "docker-compose up -d"
                sh "docker-compose exec app composer install"
                sh "docker-compose exec app php artisan key:generate"
                sh "docker-compose exec app php artisan config:cache"
                sh "docker-compose exec app php artisan route:cache"
                sh "docker-compose exec app php artisan migrate"
            }
        }
        stage("Test") {
            steps{
                sh "docker-compose exec app php artisan test --coverage"
            }
        }
        stage("Stage Build") {
            when {
                branch "master"
            }
            steps {
                sh "docker-compose exec app composer install --no-interaction --no-plugins --no-scripts --no-dev --prefer-dist"
                sh "docker-compose exec app composer dump-autoload"
                sh "docker build -t blogsite_prod:${APP_VERSION} ."
            }
        }
    }
    post {
        always {
            sh "docker-compose down"
            sh "echo 'Pipeline finished executing.'"
        }
    }
}