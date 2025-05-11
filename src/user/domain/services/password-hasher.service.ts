export const PASSWORD_HASHER = "PASSWORD_HASHER";

export interface PasswordHasherService {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}