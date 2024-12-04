import { User, UserSchema, ValidationError } from '../types';
import { store } from '../store';
import { generateId, validateSchema, getCurrentTimestamp } from '../utils';

export class UserService {
  static register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const timestamp = getCurrentTimestamp();
    const user: User = {
      id: generateId(),
      ...userData,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    try {
      validateSchema(UserSchema, user);
      store.addUser(user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError(`Failed to register user: ${error.message}`);
      }
      throw error;
    }
  }

  static getUser(id: string): User {
    return store.getUser(id);
  }
}