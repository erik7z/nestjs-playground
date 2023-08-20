import {Controller, Get, Post, Param, Body, HttpCode} from '@nestjs/common';
import {CatsService} from "./cats.service";

type CreateCatDto = {
    name: string;
}
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    findAll(): string[] {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns the cat with ID ${id}`;
    }

    @Post()
    @HttpCode(204)
    create(@Body() createCatDto: CreateCatDto) {
        // your logic here
    }

}
