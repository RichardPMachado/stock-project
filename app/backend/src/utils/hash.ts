import * as bcrypt from 'bcrypt';

export const createHash = async (password) => {
  const saltOrRounds = 10;
  const passworHash = await bcrypt.hash(password, saltOrRounds);
  return passworHash;
};
