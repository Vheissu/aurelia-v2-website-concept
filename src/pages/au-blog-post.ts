import { IRouteableComponent, Parameters } from '@aurelia/router';
import { IBlogService } from '../services/blog';
import { getMetadataFromMarkdown } from '../common/functions';
import { marked } from 'marked';

export class AuBlogPost implements IRouteableComponent {
    
        public postName = '';
        public postMeta;
        public post = '';
    
        public constructor(@IBlogService private readonly blogService: IBlogService) {

        }

        public async loading(parameters: Parameters) {
            try {
              this.postName = parameters.postName as string;

              const post = await this.blogService.loadPost(this.postName);
            
              this.postMeta = getMetadataFromMarkdown(post);

              this.post = marked.parse(post.replace(/---[\s\S]*?---/, ''));
            } catch (error) {
              console.error(error);
            }
        }                  
}