-- En este script cree la tabla "Contacts" a mano.
-- Es el equivalente a lo que generaria dotnet ef migrations add InitialCreate
-- + "dotnet ef database update".
--
-- 
--  Cree la base de datos:  CREATE DATABASE phonebookdb;


CREATE TABLE IF NOT EXISTS "Contacts" (
    "Id" SERIAL PRIMARY KEY,
    "ContactType" INTEGER NOT NULL,
    "Name" VARCHAR(150) NOT NULL,
    "PhoneNumber" VARCHAR(30) NOT NULL,
    "Comments" VARCHAR(500) NULL,
    "BirthDate" TIMESTAMP NULL,
    "JobTitle" VARCHAR(100) NULL,
    "RegistrationNumber" VARCHAR(50) NULL,
    "Department" VARCHAR(100) NULL,
    "TaxId" VARCHAR(50) NULL,
    "Industry" VARCHAR(100) NULL
);

INSERT INTO "Contacts" ("ContactType", "Name", "PhoneNumber", "Comments", "JobTitle")
VALUES (0, 'Juan Perez', '3001234567', 'Cliente frecuente', 'Contador');

INSERT INTO "Contacts" ("ContactType", "Name", "PhoneNumber", "Comments", "Department")
VALUES (1, 'Alcaldia de Barranquilla', '6053456789', 'Tramites de licencias', 'Secretaria de Transito');

INSERT INTO "Contacts" ("ContactType", "Name", "PhoneNumber", "Comments", "Industry")
VALUES (2, 'Transportes La Costa SAS', '3109876543', 'Proveedor de repuestos', 'Logistica');
