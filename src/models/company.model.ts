import Company from "../interfaces/company.interface";
import { Schema, model, Document } from "mongoose";

const companySchema = new Schema<Company>({
    name: String,
    location: String,
    slogan: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    employees: {
        type: Number,
        required: false
    },
    industry: {
        type: String,
        required: false
    }
});


companySchema.virtual('id').get(function () {
    return this._id.toHexString();
});
companySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) { delete ret._id }
});

const companyModel = model<Company & Document<Company>>('Company', companySchema);

export default companyModel;