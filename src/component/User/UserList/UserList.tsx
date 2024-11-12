import React, {useState} from 'react';
import './UserList.css'
import {UserModel} from "../../../model/UserModel.ts";
import {useDispatch} from "react-redux";
import {updateUserAction} from "../../../redux/action/UserAction.ts";
import {deleteUser} from "../../../service/UserService.ts";
import {useAppContext} from "../../../ApplicationContext/AppContext.tsx";
import {useNavigate} from "react-router-dom";
const UserList = (props) => {
    const {userList, renderUIHandler} = props.data;
    const {toggleSpinner} = useAppContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateUserHandler = (userInfo: UserModel) => {
        dispatch(updateUserAction({id: userInfo.id, userInfo: userInfo}))
        navigate('/edit-user-info')
    }
    return (
        <>
            <div className="grid-table">
                {/* Header Row */}
                <div className="grid-header">ID</div>
                <div className="grid-header">Name</div>
                <div className="grid-header">Email</div>
                <div className="grid-header"></div>
                {/* Data Rows */}
                {userList.map((item: UserModel, index) => (
                    <React.Fragment key={index}>
                        <div className="grid-item">{item.id}</div>
                        <div className="grid-item">{item.name}</div>
                        <div className="grid-item">{item.email}</div>
                        <div className="grid-item">
                            <button type={"button"} className={'edit'} onClick={(e) => {
                                updateUserHandler(item);
                            }}> Edit</button>
                            <button type={"button"} className={'delete'} onClick={(e) => {
                                toggleSpinner(true)
                                deleteUser(item.id).then(() => {
                                    renderUIHandler()
                                })
                            }}> Delete</button>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default UserList;