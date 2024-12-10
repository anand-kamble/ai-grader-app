import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

let client: SupabaseClient | null = null;

/**
 * Initialize and return the Supabase client.
 */
const getClient = (): SupabaseClient => {
  if (!client) {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_KEY');
    }
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return client;
};

/**
 * Initialize Supabase client.
 */
export const initializeSupabase = (): void => {
  getClient();
};

/**
 * Fetch all data from a table.
 */
export const getTableData = async (tableName: string): Promise<any> => {
  try {
    const client = getClient();
    const { data, error } = await client.from(tableName).select('*');
    if (error) throw error;
    return data;
  } catch (e:any) {
    throw new Error(e.message);
  }
};

/**
 * Fetch specific column data from a table.
 */
export const getColumn = async (tableName: string, columnName: string): Promise<any> => {
  try {
    const client = getClient();
    const { data, error } = await client.from(tableName).select(columnName);
    if (error) throw error;
    return data;
  } catch (e:any) {
    throw new Error(e.message);
  }
};

/**
 * Fetch a row matching a specific condition.
 */
export const getRow = async (tableName: string, columnName: string, columnValue: string): Promise<any> => {
  try {
    const client = getClient();
    const { data, error } = await client.from(tableName).select('*').eq(columnName, columnValue);
    if (error) throw error;
    return data;
  } catch (e:any) {
    throw new Error(e.message);
  }
};

/**
 * Insert data into a table.
 */
export const insertData = async (tableName: string, data: Record<string, any>): Promise<any> => {
  try {
    const client = getClient();
    const { data: result, error } = await client.from(tableName).insert(data);
    if (error) throw error;
    return result;
  } catch (e:any) {
    throw new Error(e.message);
  }
};

/**
 * Update data in a table matching a specific condition.
 */
export const updateData = async (
  tableName: string,
  data: Record<string, any>,
  columnName: string,
  columnValue: string
): Promise<any> => {
  try {
    const client = getClient();
    const { data: result, error } = await client.from(tableName).update(data).eq(columnName, columnValue);
    if (error) throw error;
    return result;
  } catch (e:any) {
    throw new Error(e.message);
  }
};
