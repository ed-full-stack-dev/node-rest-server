import Datum from "./datum";

interface User extends Datum {
    name: string;
    email: string;
    password: string;
    role?: string;
    company?: string;
}

export default User;