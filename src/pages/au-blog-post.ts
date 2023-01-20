import { IRouteableComponent } from '@aurelia/router';
import { IBlogService } from '../services/blog';

export class AuBlogPost implements IRouteableComponent {
    
        public postName: string;
        public post: string;
    
        public constructor(@IBlogService private readonly blogService: IBlogService) {
            this.postName = '';
            this.post = '';
        }
    
        public async canLoad(parameters: Record<string, string>) {
            try {
                this.postName = parameters.postName;
                this.post = await this.blogService.loadPost(this.postName);

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
}