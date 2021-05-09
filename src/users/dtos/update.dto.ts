import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must have atleast 6 characters' })
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
