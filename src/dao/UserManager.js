
import { UserModel } from './models/usersModel.js';

export default class UserManager {
    constructor() {
        this.model = UserModel;
    }

    async createUser(user) {
        try {
            return await this.model.create(user);
        } catch (error) {
            console.log(error);
        }
    }

    async findUserByEmail(email) {
        try {
            return await this.model.findOne({ email: email });
        } catch (error) {
            console.log(error);
        }
    }
}
