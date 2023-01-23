import { IRouteableComponent } from '@aurelia/router';
import { IBlogService } from '../services/blog';

export class AuBlog implements IRouteableComponent {
    private posts = [];

    constructor(@IBlogService private readonly blogService: IBlogService) { }

    async loading() {
        this.posts = await this.blogService.loadPosts();
    }

}