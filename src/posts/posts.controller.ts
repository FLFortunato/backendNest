import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/strategies/guards/jwt.guard';
import { Post as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body): Promise<any> {
    return await this.service.create(body);
  }
  @UseGuards(JwtGuard)
  @Get()
  async getPosts(): Promise<any> {
    return await this.service.getAll();
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param() id: any): Promise<any> {
    return await this.service.deletePost(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Body() post: PostEntity): Promise<any> {
    return await this.service.updatePost(post);
  }
}
