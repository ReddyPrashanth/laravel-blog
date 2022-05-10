
FROM php:8.0.2-fpm

# Copy composer.lock and composer.json
COPY ./application/composer.lock ./application/composer.json /var/www/

# Set working directory
WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libzip-dev \
    zip \
    unzip \
    curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl sockets

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY ./application /var/www

# Copy existing application directory permissions
COPY --chown=www:www ./application /var/www

# RUN composer install \
#     --no-interaction \
#     --no-plugins \
#     --no-scripts \
#     --no-dev \
#     --prefer-dist

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]