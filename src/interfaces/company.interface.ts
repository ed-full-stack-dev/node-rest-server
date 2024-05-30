interface Company extends Datum{
    name: string;
    location: string;
    slogan?: string;
    logo?: string;
    employees?: number;
    industry?: string;
    country?: string;
}
export default Company;