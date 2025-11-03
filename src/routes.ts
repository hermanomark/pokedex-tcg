import { lazy } from 'react';

import Home from './pages/Home';
const TcgCards = lazy(() => import('./pages/TcgCards'));
const Series = lazy(() => import('./pages/Series'));
const SeriesDetail = lazy(() => import('./pages/SeriesDetail'));
const Sets = lazy(() => import('./pages/Sets'));
const SetDetail = lazy(() => import('./pages/SetDetail'));
const CardDetail = lazy(() => import('./pages/CardDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const appRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cards',
    component: TcgCards,
  },
  {
    path: '/series',
    component: Series,
  },
  {
    path: '/series/:id',
    component: SeriesDetail,
  },
  {
    path: '/sets',
    component: Sets,
  },
  {
    path: '/sets/:id',
    component: SetDetail,
  },
  {
    path: '/cards/:id',
    component: CardDetail,
  },
  {
    path: '*',
    component: NotFound,
  },
];