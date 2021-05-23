import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/strategies/guards/jwt.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body): Promise<any> {
    return await this.service.create(body);
  }

  @Get()
  async getPosts(): Promise<any> {
    return await this.service.getAll();
  }

  @Delete(':id')
  async delete(@Param() { id }: any): Promise<any> {
    return await this.service.deletePost(id);
  }
}
