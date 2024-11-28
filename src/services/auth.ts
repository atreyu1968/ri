import { User } from '../types/user';
import { LoginCredentials, RegistrationData } from '../types/auth';
import { ADMIN_CODE, DEFAULT_ADMIN_USER } from '../config/constants';

// Mock storage for demo purposes
const users = new Map<string, { user: User; password: string; recoveryCode: string }>();

// Initialize with admin user
users.set(DEFAULT_ADMIN_USER.id, {
  user: DEFAULT_ADMIN_USER,
  password: 'admin123', // In production, this would be hashed
  recoveryCode: '123456',
});

export const authenticateUser = async (credentials: LoginCredentials): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find user by email
  const userEntry = Array.from(users.values()).find(
    entry => entry.user.email === credentials.email
  );
  
  if (userEntry && userEntry.password === credentials.password) {
    return userEntry.user;
  }
  
  return null;
};

export const registerUser = async (data: RegistrationData): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if email is already registered
  const existingUser = Array.from(users.values()).find(
    entry => entry.user.email === data.email
  );
  
  if (existingUser) {
    throw new Error('Email already registered');
  }
  
  // Generate recovery code
  const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name: data.name,
    lastName: data.lastName,
    medusaCode: data.medusaCode,
    email: data.email,
    phone: data.phone,
    center: data.center,
    network: '',
    role: 'manager',
  };
  
  users.set(newUser.id, {
    user: newUser,
    password: data.password,
    recoveryCode,
  });
  
  return newUser;
};

export const resetPassword = async (email: string, recoveryCode: string, newPassword: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userEntry = Array.from(users.entries()).find(
    ([_, entry]) => entry.user.email === email && entry.recoveryCode === recoveryCode
  );
  
  if (userEntry) {
    const [userId, entry] = userEntry;
    users.set(userId, {
      ...entry,
      password: newPassword,
    });
    return true;
  }
  
  return false;
};

export const getRecoveryCode = async (email: string): Promise<string | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userEntry = Array.from(users.values()).find(
    entry => entry.user.email === email
  );
  
  return userEntry?.recoveryCode || null;
};