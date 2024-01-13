import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port, // aws 등에 올릴 때 env같은 환경변수를 사용
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
