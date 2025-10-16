#!/bin/sh

echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running database migrations..."
npm run migration:run

echo "Starting the application..."
exec node dist/main.js