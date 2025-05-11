export class ResponseRegisterUserDTO {
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    id?: string;

    constructor(email: string, roles: string[], accessToken: string, refreshToken: string, id?: string) {
        this.email = email;
        this.roles = roles;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
    }
}