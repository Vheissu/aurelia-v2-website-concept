import { IRoute, IRouteableComponent } from '@aurelia/router';

export class MyApp implements IRouteableComponent {

  static routes: IRoute[] = [
    {
      path: '',
      component: () => import('./pages/au-home'),
      id: 'home',
    },
    {
      path: 'blog',
      component: () => import('./pages/au-blog'),
      id: 'blog',
    },
    {
      path: 'blog/:year/:month/:date/:postName',
      component: () => import('./pages/au-blog-post'),
      id: 'blog-post',
    },
    {
      path: 'about/faq',
      component: () => import('./pages/au-faq'),
      id: 'faq',
    },
    {
      path: 'sponsor',
      component: () => import('./pages/au-sponsor'),
      id: 'sponsor',
    }

  ];

}
