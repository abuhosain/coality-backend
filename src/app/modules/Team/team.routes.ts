import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constance';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import validateRequest from '../../middleware/validateRequest';
import { TeamValidation } from './team.validation';
import { TeamController } from './team.controller';
import { Team } from './team.model';

const router = express.Router();

// create team
router.post(
  '/create-team',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(TeamValidation.teamValidation),
  TeamController.createTeam,
);

router.get('/', TeamController.getAllTeam);

router.get('/:id', TeamController.getTeamById);

// Update team
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(TeamValidation.updateTeamValidation),
  TeamController.updateTeam,
);

export const TeamRoutes = router;
