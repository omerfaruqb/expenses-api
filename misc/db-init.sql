BEGIN;

CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL CHECK (length(password) >= 8)
);

CREATE TABLE IF NOT EXISTS public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.expenses (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT,
	category_id INT,
	description VARCHAR(255) NOT NULL,
	amount DECIMAL(12, 2) NOT NULL,
	purchased_at TIMESTAMP NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

COMMIT;