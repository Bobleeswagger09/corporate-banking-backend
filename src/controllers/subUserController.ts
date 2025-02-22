import { Request, Response } from "express";
import { createUser } from "../repositories/userRepository";

export const createSubUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["INITIATOR", "APPROVER", "VIEWER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await createUser({ name, email, password, role });
    res.status(201).json({ message: "Sub-user created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
