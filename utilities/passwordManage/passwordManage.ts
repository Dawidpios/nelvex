import bcrypt from 'bcrypt'


export async function hashPassword(password:string) {
  const hashedPassword = await bcrypt.hash(password, 12)
  return hashedPassword
}

export async function verifyPassword(password:string, hashedPassword:string) {
  const isEqual = await bcrypt.compare(password, hashedPassword)
  return isEqual
}