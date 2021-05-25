import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repo: PostRepository) {}

  create(data: any) {
    return this.repo.createPost(data);
  }

  async getAll(): Promise<any> {
    return this.repo.find();
  }

  async deletePost(id: string): Promise<any> {
    return await this.repo.deletePost(id);
  }

  async updatePost(data: Post): Promise<any> {
    return await this.repo.update(data?.id, { ...data });
  }
}
