CREATE DATABASE CRUDJun2023;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
    "Id" SERIAL PRIMARY KEY,
    "First Name" VARCHAR(1000) NOT NULL,
    "Last Name" VARCHAR(1000) NOT NULL,
    "Username" VARCHAR(1000) UNIQUE NOT NULL,
    "Password" VARCHAR(1000) NOT NULL
);

-- Table "User";


DROP TABLE IF EXISTS "Item";
CREATE TABLE "Item" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INT NOT NULL,
    "Item Name" VARCHAR(1000) NOT NULL,
    "Description" VARCHAR(1000),
    "Quantity" INT DEFAULT 0, 
     FOREIGN KEY ("UserId") REFERENCES "User"("Id")
);

-- Table "Item";

