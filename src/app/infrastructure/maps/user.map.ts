import { User } from '../models/user.model';

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export function mapUserDtoToModel(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    createdAt: new Date(dto.createdAt),
  };
}
