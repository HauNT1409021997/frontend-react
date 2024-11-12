import UserList from "./UserList/UserList.tsx";
import {useEffect, useState} from "react";
import {UserModel} from "../../model/UserModel.ts";
import UserCreate from "./UserCreate/UserCreate.tsx";
import {getUsers} from '../../service/UserService.ts'
import {useAppContext} from "../../ApplicationContext/AppContext.tsx";

const UserComponent = () => {
    const [mockData, setMockData] = useState([])
    const {displaySpinner, toggleSpinner} = useAppContext();


    const getUsersFromDB = () => {
        toggleSpinner(true)
        getUsers().then(value => {
            toggleSpinner(false)
            setMockData(value || [])
            console.log(mockData)
        }).catch((e) => alert(e))
    }

    const renderUIHandler = () => {
        getUsersFromDB();
    }

    useEffect(() => {
        getUsersFromDB();
    }, []);

    return (
        <>
            {displaySpinner && <div className="spinner"></div>}
            <UserCreate data ={{renderUIHandler}}></UserCreate>
            <UserList data={{userList: mockData, renderUIHandler}}></UserList>
        </>
    )
}

export default UserComponent;