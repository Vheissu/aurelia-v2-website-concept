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

    async loadPosts() {
        const response = await this.http.fetch('/static/blog.json', { cache: 'no-store' });
        const posts = await response.json();

        // Sort the posts by date latest
        posts.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate.getTime() - aDate.getTime();
        });

        return posts;
    }

}