import { Schema, model, Document, Types } from "mongoose";
import User from "../interfaces/user.interace";



const userSchema = new Schema<User>({
    name: String,
    email: String,
    password: String,
    company: {
        type: Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    role: {
        type: String,
        required: false
    }
});
// create a virtual property id
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
         delete ret._id;
        }
});

const userModel = model<User & Document<User>>('User', userSchema);

export default userModel;