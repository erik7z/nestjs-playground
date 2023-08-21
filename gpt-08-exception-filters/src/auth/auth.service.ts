import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    // In a real-world scenario, this service would manage user authentication, JWTs, etc.
    validateUser(username: string, password: string): any {
        if (username === 'user' && password === 'password') {
            return { id: 1, username };
        }
        return null;
    }
}
