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
  S3_STATIC_DOMAIN: string;

  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_SECURE: boolean;
  EMAIL_TO: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;

  SESSION_COOKIE_NAME: string;
  SESSION_SECRET: string;
}

export interface PublicRuntimeConfig {
  NEXT_PUBLIC_WEBSITE_DOMAIN: string;
  NEXT_PUBLIC_STATIC_DOMAIN: string;
}
