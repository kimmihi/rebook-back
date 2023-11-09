import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.RDS_PORT || dbConfig.port, // aws 등에 올릴 때 env같은 환경변수를 사용
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
