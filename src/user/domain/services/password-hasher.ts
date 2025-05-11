export const PASSWORD_HASHER = "PASSWORD_HASHER";

export interface PasswordHasher {
    hash(password: string): Promise<string>;
}