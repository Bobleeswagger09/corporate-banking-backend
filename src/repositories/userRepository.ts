import pool from "../config/db";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (user: User): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, account_number, verified) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      user.name,
      user.email,
      hashedPassword,
      user.role,
      user.accountNumber,
      false,
    ]
  );

  return result.rows[0];
};

export const verifyCorporateCustomer = async (
  adminId: string
): Promise<User | null> => {
  const accountNumber = generateAccountNumber();
  const result = await pool.query(
    `UPDATE users SET verified = TRUE, account_number = $1 WHERE id = $2 RETURNING *`,
    [accountNumber, adminId]
  );
  return result.rows[0];
};
