import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly cats: string[] = ['Tom', 'Jerry'];

    findAll(): string[] {
        return this.cats;
    }
}
