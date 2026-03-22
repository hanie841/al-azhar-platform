#!/bin/bash
set -e

echo "Deploying Al-Azhar Platform Backend..."

# Install dependencies (production only)
composer install --no-dev --optimize-autoloader

# Cache configuration, routes, and views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
php artisan migrate --force

# Create storage symlink (idempotent)
php artisan storage:link 2>/dev/null || true

# Restart queue workers if supervisor is available
if command -v supervisorctl &> /dev/null; then
    echo "Restarting queue workers..."
    supervisorctl reread
    supervisorctl update
    supervisorctl restart all
fi

echo "Deployment complete!"
