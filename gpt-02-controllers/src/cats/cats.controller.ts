import {Controller, Get, Post, Param, Body, HttpCode} from '@nestjs/common';

type CreateCatDto = {
    name: string;
}
@Controller('cats')
export class CatsController {

    @Get()
    findAll(): string {
        return 'This action returns all cats!';
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
