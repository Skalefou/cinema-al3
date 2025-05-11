export const PASSWORD_HASHER = "PASSWORD_HASHER";

export interface PasswordHasherService {
    hash(password: string): Promise<string>;
}