#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER laraveluser with encrypted password 'secret';
	CREATE DATABASE laravel_blog;
	GRANT ALL PRIVILEGES ON DATABASE laravel_blog TO laraveluser;
EOSQL