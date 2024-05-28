import { faker } from '@faker-js/faker';
import storeService from '../services/store.service';
import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
async function populateUsers(companies: any[]) {
    for (let i = 0; i < 100; i++) {
        const user = new storeService.Users({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: faker.name.jobTitle(),
            company: companies[Math.floor(Math.random() * companies.length)]._id,
        });

        await user.save();
    }

    console.log('Users populated');
}
async function populateCompanies() {
    const companies = [];
    for (let i = 0; i < 20; i++) {
        const company = new storeService.Companies({
            name: faker.company.name(),
            location: faker.address.city(),
            slogan: faker.company.catchPhrase(),
            logo: faker.image.imageUrl(),
            industry: faker.vehicle.manufacturer(),
            employees: faker.random.numeric(),
            country: faker.address.country(),
        });

        await company.save();
        companies.push(company);
    }

    console.log('Companies populated');
    return  companies;
}

async function connectToDatabase() {
    try {
        const { LOCAL_DATABASE_URL } = process.env;
        await connect(LOCAL_DATABASE_URL as string);
        console.log('Connected to the database! (•‿•)');
    } catch (error) {
        console.log('Error during connection! (✖╭╮✖)', error);
    }
}

async function runScript() {
    await connectToDatabase();
    const companies = await populateCompanies();
    await populateUsers(companies);
    await disconnect();
}

runScript().catch(console.error);