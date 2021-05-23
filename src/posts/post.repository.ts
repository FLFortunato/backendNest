import { EntityRepository, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(data): Promise<any> {
    try {
      const post = await this.create({
        user: data.userID,
        title: data.title,
        content: data.content,
      });
      post.save();
      return post;
    } catch (error) {
      throw new Error('An error occurred while trying to create the post');
    }
  }

  async deletePost(id: string): Promise<any> {
    try {
      await this.delete(id);
    } catch (error) {}
  }
}
