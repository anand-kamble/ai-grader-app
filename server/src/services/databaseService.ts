import { Client } from "pg";
import { User } from "shared-types";
import Logger from "../utils/logger";

const logger = new Logger("databaseService");
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
});

export const init = async () => {
  logger.log("Initializing database");  
  try {
    await client.connect();
  
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
          CREATE TYPE user_type AS ENUM ('admin', 'student', 'teacher');
        END IF;
      END $$;
    `);
  
    await client.query(`
  CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      type user_type NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
      password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 8)
  );
  
  CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
  `);
  } catch (error) {
    logger.error("Error initializing database");
    throw error;
  }
};

export const addUser = async (user: User) => {
  logger.log("Adding user to database");
  try {
    const result = await client.query<User>(`INSERT INTO users (type, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`, [
      user.type,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
    ]);
    return true;
  } catch (error) {
    logger.error("Error adding user to database");
    logger.verbose(error as string);
    return false;
  }
};

export const userExists = async (email: string): Promise<boolean> => {
  try {
    const result = await client.query(`SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS "exists"`, [email]);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  logger.log(`Retrieving user by email: ${email}`);
  try {
    const result = await client.query<User>(
      `SELECT id, type, first_name AS "firstName", last_name AS "lastName", email, password FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    logger.error(`Error retrieving user by email: ${email}`);
    logger.verbose(error as string);
    throw error;
  }
};
