import bcrypt from 'bcrypt';

// encrypts a password string with the returned hash
export const hashPassword = async (password?: string) => {
  if (password) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } else return null;
};

// compares a password string with an encrypted string
export const isCorrectPw = async (password: string, encrypted: string) => {
  return bcrypt.compare(password!, encrypted);
};
