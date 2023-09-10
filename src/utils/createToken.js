import crypto from 'crypto'

export default function createToken() {
  return crypto.randomBytes(64).toString('hex')
}
