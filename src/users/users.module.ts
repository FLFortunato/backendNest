import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'src/emailConfirmation/email.module';
import { EmailService } from 'src/emailConfirmation/email.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/auth/strategies/secret';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    EmailModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
