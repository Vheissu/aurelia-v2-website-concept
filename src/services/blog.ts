import { DI } from 'aurelia';
import { HttpClient } from '@aurelia/fetch-client';
import { newInstanceOf } from '@aurelia/kernel';

export const IBlogService = DI.createInterface<IBlogService>('IBlogService', x => x.singleton(BlogService));
export type IBlogService = BlogService;

export class BlogService {

    constructor(@newInstanceOf(HttpClient) private readonly http: HttpClient) {
        this.http.configure(config => {
            return config
                .useStandardConfiguration()
        });
    }

    loadPost(postName: string) {
        return this.http.fetch(`/blog-posts/${postName}.md`, { cache: 'no-store' }).then(response => response.text());
    }

    loadPosts() {
        return this.http.fetch('/static/blog.json', { cache: 'no-store' }).then(response => response.json());
    }

}