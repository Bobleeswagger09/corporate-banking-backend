import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient";
import { generateAccountNumber } from "../utils/accountUtils";

export const verifyCorporateCustomer = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Find user by ID and check if they are a corporate customer
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== "ADMIN") {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Generate unique account number
    const accountNumber = generateAccountNumber();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Update user with verification details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        accountNumber,
        token, // Storing token temporarily for returning, ideally handled via auth flow
      },
    });

    res.status(200).json({
      message: "User verified successfully",
      accountNumber,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
