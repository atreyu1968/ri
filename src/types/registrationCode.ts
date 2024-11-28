export interface RegistrationCode {
  id: string;
  code: string;
  role: 'admin' | 'general_coordinator' | 'subnet_coordinator' | 'manager';
  expirationDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}