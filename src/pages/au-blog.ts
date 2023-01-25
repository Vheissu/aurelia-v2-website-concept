import { IRouteableComponent } from '@aurelia/router';
import { IBlogService } from '../services/blog';
import { paginateArray } from '../common/functions';

export class AuBlog implements IRouteableComponent {
    private posts = {
        currentPage: 1,
        results: [],
        totalPages: 0
    };

    constructor(@IBlogService private readonly blogService: IBlogService) { }

    async loading() {
        const posts = await this.blogService.loadPosts();

        this.posts = paginateArray(posts, 7);
    }

}