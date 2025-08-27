import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class HotelsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    city: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    minPrice: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    maxPrice: number;
}
