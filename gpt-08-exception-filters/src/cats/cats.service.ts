import {Injectable, NotFoundException, UseFilters} from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {HttpExceptionFilter} from "../filters/http-exception.filter";

@Injectable()
export class CatsService {
    private readonly cats: string[] = ['Tom', 'Jerry'];

    // optionally apply a filter to a specific method
    // @UseFilters(new HttpExceptionFilter())
    findOne(id: number): string {
        const cat = this.cats[id];
        if (!cat) {
            throw new NotFoundException(`Cat with ID ${id} not found`); // This is a NestJS built-in exception
        }
        return cat;
    }

    findAll(): string[] {
        return this.cats;
    }

    create(validatedCat: CreateCatDto) {
        this.cats.push(validatedCat.name);
    }
}
