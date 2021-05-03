import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './ormConfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule,
    AuthModule,
    EmailModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
