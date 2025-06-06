# Use the official PHP image with Apache
FROM php:8.2-apache

# Enable Apache mod_rewrite for .htaccess support
RUN a2enmod rewrite

# Copy all backend files to the Apache document root
COPY . /var/www/html/

# Set recommended permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 (default for Apache)
EXPOSE 80