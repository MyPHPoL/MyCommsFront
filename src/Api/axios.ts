import axios from 'axios';

const BASE_URL = 'https://localhost:7031';
const REGISTER_URL = '/Account/Register';
const LOGIN_URL = '/Account/Login';
const SERVER_LIST_URL = '/Server/GetServers';
const FRIEND_LIST_URL = '/FriendList/GetAll';
const SERVER_URL = '/Server/GetServer?id=';
const CHANNELS_URL = '/Channel/GetAllOnServer?id=';
const ALL_MESSAGES_URL = '/Message/GetAll?channelId=';
const USER_GET_URL = '/User/Get?id=';
const CHANNEL_INFO_URL = '/Channel/Get?id=';
const SEND_MESSAGE_URL = '/Message/Create';
const CREATE_SERVER_URL = '/Server/Create';
const CREATE_CHANNEL_URL = '/Channel/Add';
const DELETE_CHANNEL_URL = '/Channel/Delete?id=';


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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const getAllMessages = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+ALL_MESSAGES_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const getUsername = async (token: string, id: string) => {
    try{
        const response = await axios.get(
            BASE_URL+USER_GET_URL+id,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            },
        );
        return response.data.username;
    } catch (error) {
        return "Unknown User"
    };
};

export const getChannelInfo = async (token: string, id: string) => {
    const response = await axios.post(
        BASE_URL+CHANNEL_INFO_URL+id,
        {},
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const sendMessage = async (token: string, channelId: string, body: string, respondToId: string) => {
    const response = await axios.post(
        BASE_URL+SEND_MESSAGE_URL,
        JSON.stringify({
            channelId: channelId,
            body: body,
            respondToId: respondToId,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const createServer = async (token: string, serverName: string, serverDescription: string, isPublic: boolean) => {
    const response = await axios.post(
        BASE_URL+CREATE_SERVER_URL,
        JSON.stringify({
            name: serverName,
            description: serverDescription,
            isPublic: isPublic,
            picture: null,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const createChannel = async (token: string, channelName: string, channelDescription: string, serverId: string) => {
    const response = await axios.post(
        BASE_URL+CREATE_CHANNEL_URL,
        JSON.stringify({
            name: channelName,
            description: channelDescription,
            serverId: serverId,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const deleteChannel = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+DELETE_CHANNEL_URL+id,
        {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

// in works
// export const joinServer = async (token: string, id: string) => {
//     const response = await axios.post(
//         BASE_URL+DELETE_CHANNEL_URL+id,
//         {
//             headers: { 
//                 Authorization: `Bearer ${token}` 
//             }
//         },
//     );
//     return response;
// };
