import { IsUUID } from "class-validator";

export class AssignTrainerDto {
    @IsUUID()
    trainer_id!:string;
}