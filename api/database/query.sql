CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    link TEXT NOT NULL,
    category VARCHAR(20) NOT NULL,
    source VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_constraint_name UNIQUE (title, image, link)
)

-- enter news
INSERT INTO news (title, image, link, category, source)
VALUES ($1, $2, $3)
ON CONFLICT (title, image, link) DO UPDATE

-- get news
SELECT *
FROM news
WHERE category = $1
ORDER BY created_at DESC
LIMIT 5
