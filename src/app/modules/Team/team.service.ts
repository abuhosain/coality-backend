import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFile } from '../../interface/image.interface';
import { ITeam } from './team.interface';
import { Team } from './team.model';
import { get } from 'mongoose';

const createTeam = async (payload: ITeam, file: TImageFile) => {
  const teamData: ITeam = {
    ...payload,
    photo: file?.path,
  };
  const result = await Team.create(teamData);
  return result;
};

const getAllTeam = async () => {
  const team = await Team.find();
  return team;
};

const getTeamById = async (id: string) => {
  const team = await Team.findById(id);
  if (!team) {
    throw new AppError(httpStatus.NOT_FOUND, 'Team not found');
  }
  return team;
};

export const TeamServices = {
  createTeam,
  getAllTeam,
  getTeamById,
};
