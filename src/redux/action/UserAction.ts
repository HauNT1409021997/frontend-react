import {UserModel} from "../../model/UserModel";

interface UpdateUserValue {
    id: number,
    userInfo: UserModel
}
export const updateUserAction = (value: UpdateUserValue) => {
    return {
        type: 'UPDATE_USER',
        payload: value
    };
};
