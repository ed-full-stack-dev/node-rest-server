import userModel from "../models/user.model";
import companyModel from "../models/company.model";
class StoreService {
    public Users = userModel;
    public Companies = companyModel;
}

export default new StoreService();
