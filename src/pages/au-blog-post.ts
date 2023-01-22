import { IRouteableComponent, Parameters } from '@aurelia/router';
import { IBlogService } from '../services/blog';
import { marked } from 'marked';

export class AuBlogPost implements IRouteableComponent {
    
        public postName = '';
        public post = '';
    
        public constructor(@IBlogService private readonly blogService: IBlogService) {

        }

        public async loading(parameters: Parameters) {
            try {
              this.postName = parameters.postName as string;
              this.post = await this.blogService.loadPost(this.postName);
              this.post = marked.parse(this.post.replace(/---[\s\S]*?---/, ''));
            } catch (error) {
              console.error(error);
            }
        }          
}