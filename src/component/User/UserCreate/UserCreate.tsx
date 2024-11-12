import {useState} from "react";
import {UserModel} from "../../../model/UserModel.ts";
import './UserCreate.css'
import {addUser} from '../../../service/UserService.ts'
import {useAppContext} from "../../../ApplicationContext/AppContext.tsx";
const UserCreate = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const {toggleSpinner} = useAppContext();
    const {renderUIHandler} = props.data;
    const createUser = (event) => {
        console.log("userName", userName)
        console.log("userEmail", userEmail)
        if (!userName || !userEmail) {
            alert("Please enter both name and email");
            return;
        }
        const newUser = new UserModel(userName, userEmail);
        toggleSpinner(true)
        addUser(newUser).then(() => {
            toggleSpinner(false)
            renderUIHandler();
        })
        .catch((e) => alert(e));
    }
    return (
        <>
            <form className={'user-form'}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required
                           value={userName} onChange={(e) => {
                        setUserName(e.target.value)
                    }}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Email</label>
                    <input type="text" id="password" name="password" placeholder="Enter your email" required
                           value={userEmail} onChange={(e) => {
                        setUserEmail(e.target.value)
                    }}/>
                </div>
                <button type="button" className={"btn btn-primary create"} onClick={(e) => {
                    createUser(e);
                }}>Create
                </button>
            </form>
        </>
    )
}

export default UserCreate;