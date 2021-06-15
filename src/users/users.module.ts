import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'src/emailConfirmation/email.module';
import { EmailService } from 'src/emailConfirmation/email.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/auth/strategies/secret';
import { SendMailProducerService } from 'src/emailConfirmation/email.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    EmailModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '3600s' },
    }),
    BullModule.registerQueue({ name: 'sendMail-queue' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, SendMailProducerService],
  exports: [UsersService],
})
export class UsersModule {}
