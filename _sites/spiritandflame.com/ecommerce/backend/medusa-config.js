const dotenv = require('dotenv');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production';
    break;
  case 'staging':
    ENV_FILE_NAME = '.env.staging';
    break;
  case 'test':
    ENV_FILE_NAME = '.env.test';
    break;
  case 'development':
  default:
    ENV_FILE_NAME = '.env';
    break;
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || 'http://localhost:7000,http://localhost:7001';

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000';

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/medusa-store';

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // search
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_MASTER_KEY,
      },
      settings: {
        // index name
        products: {
          // MeiliSearch's setting options to be set on a particular index
          searchableAttributes: ['title', 'description', 'variant_sku'],
          displayedAttributes: ['title', 'description', 'variant_sku', 'thumbnail', 'handle'],
        },
      },
    },
  },
  {
    resolve: '@medusajs/admin',
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      // ...
    },
  },
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   /** @type {import('medusa-payment-stripe').PluginOptions} */
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
  // File Object Storage (MinIO)
  {
    resolve: `medusa-file-minio`,
    options: {
      endpoint: process.env.MINIO_ENDPOINT,
      bucket: process.env.MINIO_BUCKET,
      private_bucket: process.env.MINIO_PRIVATE_BUCKET,
      access_key_id: process.env.MINIO_KEY,
      secret_access_key: process.env.MINIO_SECRET,
    },
  },
];
/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    jwt_secret: process.env.JWT_SECRET,
    cookie_secret: process.env.COOKIE_SECRET,
    redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: DATABASE_URL,
    database_type: 'postgres',
    // database_database: './medusa-db.sql',
    // database_type: 'sqlite',
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
