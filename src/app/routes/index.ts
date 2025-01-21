import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ServiceRoutes } from '../modules/Service/service.route';
import { ReviewRoutes } from '../modules/Review/review.route';
import { BrandsRoutes } from '../modules/Brand/brand.route';
import { WorkRoutes } from '../modules/Work/work.route';

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
  {
    path: '/brand',
    route: BrandsRoutes,
  },
  {
    path: '/work',
    route: WorkRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
