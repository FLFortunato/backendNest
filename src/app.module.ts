import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './ormConfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './emailConfirmation/email.module';
import { PostsModule } from './posts/posts.module';
import { UserDataModule } from './userData/userData.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    UsersModule,
    AuthModule,
    EmailModule,
    PostsModule,
    UserDataModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
