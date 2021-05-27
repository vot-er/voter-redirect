require('dotenv').config()

const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client
  .connect()
  .then(() =>
    client.query(
      `
    CREATE TABLE event (
      ref text unique,
      type text,
      "createdAt" timestamp without time zone,
      ip text,
      browser text,
      "userAgent" text,
      device text,
      os text,
      platform text,
      id integer NOT NULL PRIMARY KEY,
      destination text
    );
    CREATE TABLE organization (
        id integer NOT NULL PRIMARY KEY,
        name text NOT NULL,
        "externalId" text UNIQUE
    );
    CREATE TABLE organization (
        id integer NOT NULL PRIMARY KEY,
        name text NOT NULL,
        "externalId" text UNIQUE
    );
    CREATE TABLE referrer (
        id integer NOT NULL PRIMARY KEY,
        ref text unique,
        state text,
        organization integer,
        "firstName" text,
        "lastName" text,
        "orderId" text,
        CONSTRAINT "referrer_orderId_key" UNIQUE ("orderId"),
        CONSTRAINT referrer_organization_fkey FOREIGN KEY (organization)
            REFERENCES organization (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )`
    )
  )
  .catch((err) => console.error(err))
  .finally(() => process.exit())
