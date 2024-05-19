import { IsNotEmpty } from "class-validator";

export class LocalProductoDto {
    @IsNotEmpty()
    cantidad: number;

    @IsNotEmpty()
    local_id: number;

    @IsNotEmpty()
    producto_id: number;
}