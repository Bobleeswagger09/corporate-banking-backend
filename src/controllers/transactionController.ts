import { Request, Response } from "express";
import { prisma } from "../config/prismaClient"; // Assuming Prisma is used for DB
import { validateTransaction } from "../utils/transactionUtils";

/**
 * @desc Admins can create a new transaction (single, bulk, scheduled)
 * @route POST /api/transactions
 * @access Private (Admins only)
 */
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { adminId, type, amount, recipient, scheduleDate } = req.body;

    // Validate transaction data
    const validationError = validateTransaction(req.body);
    if (validationError)
      return res.status(400).json({ message: validationError });

    // Ensure the user is an Admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId, role: "ADMIN" },
    });

    if (!admin)
      return res.status(403).json({
        message: "Access Denied. Only Admins can perform transactions.",
      });

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        adminId,
        type,
        amount,
        recipient,
        status: "PENDING",
        scheduleDate,
      },
    });

    return res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    console.error("Transaction Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Admins can view transaction history
 * @route GET /api/transactions/:adminId
 * @access Private (Admins only)
 */
export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;

    // Fetch transactions for the admin
    const transactions = await prisma.transaction.findMany({
      where: { adminId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ transactions });
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
