/**
 * Auth validation utility.
 * Credentials are stored as SHA-256 hashes — never in plaintext.
 * This is a client-side demo gate; production apps must validate server-side.
 */

// Pre-computed SHA-256 hex digests
const VALID_EMAIL_HASH = '57e3a7f446392f3d4606f0af0465630e74f96805148b48f0e3ce04685b1ba423';
const VALID_PASS_HASH  = '260db4e6c6e8e82d263b677dced83662edd6f8a4fcbfd3d8f3fdbc5160363a38';

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  const [emailHash, passHash] = await Promise.all([
    sha256(email.trim().toLowerCase()),
    sha256(password),
  ]);
  return emailHash === VALID_EMAIL_HASH && passHash === VALID_PASS_HASH;
}
