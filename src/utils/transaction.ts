export const validateTransaction = (data: any): string | null => {
  const { type, amount, recipient } = data;

  if (!type || !["SINGLE", "BULK", "SCHEDULED"].includes(type)) {
    return "Invalid transaction type.";
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    return "Amount must be a positive number.";
  }

  if (!recipient || typeof recipient !== "string") {
    return "Invalid recipient details.";
  }

  return null;
};
