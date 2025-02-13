import knex from 'knex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const knexfile = (await import(join(__dirname, '../../knexfile.js'))).default;

const environment = process.env.NODE_ENV || 'development';
const dbConfig = knexfile[environment];

export const db = knex(dbConfig); 