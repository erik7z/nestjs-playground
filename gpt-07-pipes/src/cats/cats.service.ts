import { Injectable } from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";

@Injectable()
export class CatsService {
    private readonly cats: string[] = ['Tom', 'Jerry'];

    findAll(): string[] {
        return this.cats;
    }

    create(validatedCat: CreateCatDto) {
        this.cats.push(validatedCat.name);
    }
}
