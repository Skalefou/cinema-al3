export class TokenPayload {
    userId: string;
    email: string;
    roles: string[];

    constructor(userId: string, email: string, roles: string[]) {
        this.userId = userId;
        this.email = email;
        this.roles = roles;
    }
}