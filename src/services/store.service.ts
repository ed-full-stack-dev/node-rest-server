import userModel from "../models/user.model";
import companyModel from "../models/company.model";
import { Model, Document } from 'mongoose';


interface IStore {
    users: Model<User & Document>;
    companies: Model<Company & Document>;
}
class StoreService {
    public Users = userModel;
    public Companies = companyModel;
    public store: IStore;
    constructor() {
        this.store = {
            users: userModel,
            companies: companyModel
        }
    }
}

class Store {
    private users: Model<User & Document>;
    private companies: Model<Company & Document>;
    public store: IStore;
    constructor() {
        this.store = {
            users: userModel,
            companies: companyModel
        }
    }
}
const { store } = new Store();
export { store };

export default new StoreService();
