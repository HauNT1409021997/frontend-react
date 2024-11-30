// src/services/userService.js

import axios from 'axios';
import {UserModel} from "../model/UserModel.ts";

const API_URL = process['env']['REACT_APP_BACKEND_ENDPOINT']; // Replace with your actual API endpoint

console.log("API_URL", API_URL)

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Get a single user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Add a new user
export const addUser = async (user: UserModel) => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

// Update an existing user by ID
export const updateUser = async (id, updatedUser: UserModel) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedUser);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Delete a user by ID
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

