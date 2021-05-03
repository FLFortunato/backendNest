import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repo: PostRepository) {}

  create(data: any) {
    return this.repo.createPost(data);
  }
}
