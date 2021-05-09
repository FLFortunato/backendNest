import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/auth/strategies/secret';

@Module({
  imports: [
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
