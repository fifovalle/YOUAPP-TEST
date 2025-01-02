export const calculateAge = (birthdate: string): number | null => {
  if (!birthdate) return null;
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age >= 0 ? age : null;
};
