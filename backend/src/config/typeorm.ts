import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config = {
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: process.env.DB_SSL === 'true' && {
    key: process.env.DB_SSL_KEY ?? undefined,
    cert: process.env.DB_SSL_CERT ?? undefined,
    ca: process.env.DB_SSL_CA ?? undefined,
    capath: process.env.DB_SSL_CAPATH ?? undefined,
    cipher: process.env.DB_SSL_CIPHER ?? undefined,
    rejectUnauthorized:
      process.env.DB_REJECT_UNAUTHORIZED === 'true' ? true : false,
  },
  entities: ['dist/**/entities/**/*{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
