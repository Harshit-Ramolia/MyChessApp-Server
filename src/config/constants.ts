import "../util/dotenv"
export const IS_PROD = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "Chess_0101";
export const COOKIE_MAX_AGE = 365 * 1 * 24 * 60 * 60 * 1000;
export const GOOGLE_CLIENT_ID = process.env.google_client_id;