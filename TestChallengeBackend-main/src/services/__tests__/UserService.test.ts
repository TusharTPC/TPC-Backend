import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../UserService';
import { ValidationError } from '../../types';

describe('UserService', () => {
  const validUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
  };

  it('should successfully register a valid user', () => {
    const user = UserService.register(validUserData);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(validUserData.name);
    expect(user.email).toBe(validUserData.email);
    expect(user.phone).toBe(validUserData.phone);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw ValidationError for invalid email', () => {
    expect(() =>
      UserService.register({
        ...validUserData,
        email: 'invalid-email',
      })
    ).toThrow(ValidationError);
  });

  it('should throw ValidationError for invalid phone number', () => {
    expect(() =>
      UserService.register({
        ...validUserData,
        phone: '123',
      })
    ).toThrow(ValidationError);
  });

  it('should retrieve an existing user', () => {
    const created = UserService.register(validUserData);
    const retrieved = UserService.getUser(created.id);
    expect(retrieved).toEqual(created);
  });
});