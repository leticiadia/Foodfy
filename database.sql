CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "chef_id" int REFERENCES chefs(id),
    "title" text,
    "ingredients" text[],
    "preparation" text[],
    "information" text[],
    "created_at" timestamp DEFAULT (now())
)

CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "avatar_url" text,
    "created_at" timestamp DEFAULT (now())
)

CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "path" text NOT NULL
)

CREATE TABLE "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" int REFERENCES recipes(id)
    "file_id" int REFERENCES files(id)
)