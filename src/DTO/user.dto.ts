import { IsString } from "class-validator";

export default class UserDTO {
    @IsString()
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public company: string;
}