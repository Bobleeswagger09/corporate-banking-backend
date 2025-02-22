export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "INITIATOR"
  | "APPROVER"
  | "VIEWER";

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  accountNumber?: string;
  verified?: boolean;
  createdAt?: Date;
}
