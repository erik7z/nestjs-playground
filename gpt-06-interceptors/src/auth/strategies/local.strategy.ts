import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        // You'd typically fetch the user from your database here
        // For this example, let's use a dummy check.
        if (username === 'user' && password === 'password') {
            return { id: 1, username };
        } else {
            throw new UnauthorizedException();
        }
    }
}
