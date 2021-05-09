import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataController } from './userData.controller';
import { UserDataRepository } from './userData.repository';
import { UserDataService } from './userData.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDataRepository])],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
