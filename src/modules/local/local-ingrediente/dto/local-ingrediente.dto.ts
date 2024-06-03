import { IsNotEmpty } from "class-validator";

export class LocalIngredienteDto {
    @IsNotEmpty()
    cantidad: number;

    @IsNotEmpty()
    local_id: number;

    @IsNotEmpty()
    ingrediente_id: number;
}