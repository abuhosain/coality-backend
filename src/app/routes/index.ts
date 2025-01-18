import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ServiceRoutes } from '../modules/Service/service.route';
import { ReviewRoutes } from '../modules/Review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
