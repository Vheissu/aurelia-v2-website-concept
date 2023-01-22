import { IRouteableComponent, Parameters } from '@aurelia/router';
import { IBlogService } from '../services/blog';

export class AuBlogPost implements IRouteableComponent {
    
        public postName = '';
        public post = '';
    
        public constructor(@IBlogService private readonly blogService: IBlogService) {

        }

        public async loading(parameters: Parameters) {
            try {
                console.log(parameters);
                this.postName = parameters.postName as string;
    
                this.post = await this.blogService.loadPost(this.postName);
            } catch (error) {
                console.log(error);
            }
        }
}