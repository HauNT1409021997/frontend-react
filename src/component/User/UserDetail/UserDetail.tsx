import {useContext, useState} from "react";
import './UserDetail.css'
import {UserModel} from "../../../model/UserModel.ts";
import {useSelector} from "react-redux";
// import store from "../../../redux/store/store.ts";
import {updateUser} from "../../../service/UserService.ts";
import {useAppContext} from "../../../ApplicationContext/AppContext.tsx";
import {useNavigate} from "react-router-dom";
const UserDetail = () => {
    const user: UserModel = useSelector((state) => state['userStore'].userInfo);
    let [userState, setUserState] = useState(user);
    let [newName, setNewName] = useState(user.name);
    let [newEmail, setNewEmail] = useState(user.email);
    const {toggleSpinner} = useAppContext()
    const navigate = useNavigate()
    return (
        <>
            <form action="/submit" method="POST" id="editForm">
                <div className="form-group">
                    <label htmlFor="username">Name:</label>
                    <input type="text" id="username" name="username" placeholder="Enter your name" required value={newName} onChange={(e) => {
                        setNewName(e.target.value)
                    }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" placeholder="Enter your email" required value={newEmail} onChange={(e) => {
                        setNewEmail(e.target.value)
                    }}/>
                </div>

                <button type="button" className="submit-btn" onClick={(e) => {
                    toggleSpinner(true)
                    const newUserInfo: UserModel = new UserModel(newName, newEmail, user.id)
                    updateUser(user.id, newUserInfo).then(value => {
                        toggleSpinner(false);
                        navigate('/')
                    })
                }}>Save Changes</button>
            </form>
        </>
    )
};

export default UserDetail;