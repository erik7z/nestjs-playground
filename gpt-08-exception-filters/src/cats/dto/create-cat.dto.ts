import { IsString, Length } from 'class-validator';

export class CreateCatDto {
    @IsString()
    @Length(3, 20)
    name: string;
}