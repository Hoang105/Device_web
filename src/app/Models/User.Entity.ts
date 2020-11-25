import { RoleEntity } from './Role.Entity';

export class UserEntity {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role:RoleEntity;
    token?: string;
}