export const validateSubUser = (data: any): string | null => {
  const { name, email, role } = data;
  const validRoles = ["INITIATOR", "APPROVER", "VIEWER"];

  if (!name || typeof name !== "string") {
    return "Name is required and must be a string.";
  }

  if (!email || !email.includes("@")) {
    return "Valid email is required.";
  }

  if (!role || !validRoles.includes(role)) {
    return "Invalid role. Allowed roles: INITIATOR, APPROVER, VIEWER.";
  }

  return null;
};
