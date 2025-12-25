#!/bin/sh

echo "Waiting for database..."
sleep 5

echo "Running migrations..."
for file in /app/migrations/*.sql
do
  psql "$DATABASE_URL" -f "$file"
done

echo "Running seeds..."
psql "$DATABASE_URL" -f /app/seeds/seed.sql

echo "Starting backend..."
npm start
