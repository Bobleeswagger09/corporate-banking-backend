import { Request, Response } from "express";
import { verifyCorporateCustomer } from "../repositories/userRepository";

export const verifyCustomer = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const admin = await verifyCorporateCustomer(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Admin verified successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
