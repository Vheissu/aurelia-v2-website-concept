import { IRoute, IRouteableComponent } from '@aurelia/router';

export class MyApp implements IRouteableComponent {

  static routes: IRoute[] = [
    {
      path: '',
      component: () => import('./pages/au-home'),
      id: 'home',
    },
    {
      path: 'blog/posts',
      component: () => import('./pages/au-blog'),
      id: 'blog',
    },
    {
      path: 'blog/post/:postName',
      component: () => import('./pages/au-blog-post'),
      id: 'blog-post',
    }

  ];

}
