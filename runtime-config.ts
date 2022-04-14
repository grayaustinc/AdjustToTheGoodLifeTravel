export interface ServerRuntimeConfig {
  ARANGO_URL: string;
  ARANGO_USERNAME: string;
  ARANGO_PASSWORD: string;
  ARANGO_DATABASE_NAME: string;
  ARANGO_MAX_SOCKETS: number;

  S3_ENDPOINT: string;
  S3_BUCKET: string;
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;

  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_SECURE: boolean;
  EMAIL_TO: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;

  SESSION_COOKIE_NAME: string;
  SESSION_SECRET: string;
  SESSION_SECURE: boolean;
}

export interface PublicRuntimeConfig {
  ANALYTICS_DISABLED: boolean;
  ANALYTICS_SITE_ID: number;

  WEBSITE_DOMAIN: string;
  WEBSITE_EMAIL_DOMAIN: string;
  WEBSITE_ANALYTICS_DOMAIN: string;
  WEBSITE_S3_DOMAIN: string;
  WEBSITE_DATABASE_DOMAIN: string;
}
