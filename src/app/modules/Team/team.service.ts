import { TImageFile } from '../../interface/image.interface';
import { ITeam } from './team.interface';
import { Team } from './team.model';

const createTeam = async (payload: ITeam, file: TImageFile) => {
  const teamData: ITeam = {
    ...payload,
    photo: file?.path,
  };
  const result = await Team.create(teamData);
  return result;
};

export const TeamServices = {
  createTeam,
};
