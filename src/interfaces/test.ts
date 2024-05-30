interface Datum {
    id: string;
}

interface User extends Datum {
    name: string;
    email: string;
    password: string;
    role?: string;
    company?: string;
}
interface Company extends Datum{
    name: string;
    location: string;
    slogan?: string;
    logo?: string;
    employees?: number;
    industry?: string;
    country?: string;
}

// const store: { [key: string]: User } = {};
