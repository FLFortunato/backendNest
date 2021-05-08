import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
