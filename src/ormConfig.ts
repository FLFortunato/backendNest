import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs',
  port: 5432,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
