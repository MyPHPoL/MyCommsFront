import axios from 'axios';

const BASE_URL = 'https://localhost:7031';
const REGISTER_URL = '/Account/Register';
const LOGIN_URL = '/Account/Login';
const SERVER_LIST_URL = '/Server/GetServers';
const FRIEND_LIST_URL = '/FriendList/GetAll';
const SERVER_URL = '/Server/GetServer?id=';
const CHANNELS_URL = '/Channel/GetAllOnServer?id=';

export const registerUser = async (username: string, email: string, password: string, repeatPassword: string) => {
    const response = await axios.post(
        BASE_URL+REGISTER_URL,
        JSON.stringify({
            name: username,
            email: email,
            password: password,
            confirmPassword: repeatPassword,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    return response;
};

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(
        BASE_URL+LOGIN_URL,
        JSON.stringify({
            email: email,
            password: password,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    return response;
};

export const getServers = async (token: string) => {
    const response = await axios.get(
        BASE_URL+SERVER_LIST_URL,
        {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getFriends = async (token: string) => {
    const response = await axios.get(
        BASE_URL+FRIEND_LIST_URL,
        {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getServer = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+SERVER_URL+id,
        {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getChannels = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+CHANNELS_URL+id,
        {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};