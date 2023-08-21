import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    HttpCode,
    UseGuards,
    ValidationPipe,
    UsePipes,
    ParseIntPipe
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {AuthGuard} from "../auth/auth.guard";

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
    findOne(@Param('id', ParseIntPipe) id: string): string {
        return `This action returns the cat with ID ${id}`;
    }

    @Post()
    @HttpCode(204)
    @UsePipes(new ValidationPipe())
    create(@Body() createCatDto: CreateCatDto) {
        // Payload is now validated and transformed to match CreateCatDto
        this.catsService.create(createCatDto);
    }

    @Get('protected')
    @UseGuards(AuthGuard)
    findProtectedCats() {
        return "This route is protected!";
    }

}
