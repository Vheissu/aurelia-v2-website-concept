import { DI } from 'aurelia';
import { IHttpClient, json } from '@aurelia/fetch-client';
import { newInstanceOf } from '@aurelia/kernel';

export const IBlogService = DI.createInterface<IBlogService>('IBlogService', x => x.singleton(BlogService));
export interface IBlogService extends BlogService {}

export class BlogService {

    constructor(@newInstanceOf(IHttpClient) private readonly http: IHttpClient) {
        this.http.configure(config => {
            return config
                .useStandardConfiguration()
                .withBaseUrl('https://raw.githubusercontent.com/Vheissu/aurelia-v2-website-concept/main/');
        });
    }

    loadPost(postName: string) {
        return this.http.fetch(`/blog/${postName}.md`, { cache: 'no-store' }).then(response => response.text());
    }

    loadPosts() {
        return this.http.fetch('blog.json', { cache: 'no-store' }).then(response => response.json());
    }

}