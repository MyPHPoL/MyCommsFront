import axios from 'axios';
import { GifProps } from '../Components/TextBar';

const BASE_URL = 'https://localhost:7031';
const REGISTER_URL = '/Account/Register';
const LOGIN_URL = '/Account/Login';
const SERVER_LIST_URL = '/Server/GetServers';
const FRIEND_LIST_URL = '/FriendList/GetAllFriends';
const SERVER_URL = '/Server/GetServer?id=';
const CHANNELS_URL = '/Channel/GetAllOnServer?id=';
const ALL_MESSAGES_URL = '/Message/GetAll?channelId=';
const USER_GET_URL = '/User/Get?id=';
const CHANNEL_INFO_URL = '/Channel/Get?id=';
const SEND_MESSAGE_URL = '/Message/Create';
const CREATE_SERVER_URL = '/Server/Create';
const CREATE_CHANNEL_URL = '/Channel/Add';
const EDIT_CHANNEL_URL = '/Channel/Edit?channelId=';
const DELETE_CHANNEL_URL = '/Channel/Delete?channelId=';
const JOIN_SERVER_URL = '/Server/JoinServer?name=';
const DELETE_SERVER_URL = '/Server/DeleteServer?serverId=';
const GET_SERVER_MEMBERS_URL = '/Server/GetUsers?id=';
const KICK_USER_URL = '/Server/KickUser?serverId=';
const EDIT_USER = '/User/EditForm';
const DELETE_MESSAGE_URL = '/Message/Delete?id=';
const DELETE_PRIVATE_MESSAGE_URL = '/PrivateMessage/Delete?id=';
const ADD_PICTURE = '/Server/AddPicture?serverId=';
const SERVER_EDIT = '/Server/Edit?serverId=';
const SEARCH_GIF = '/FavoriteGifs/Search?keyword=';
const FAVORITE_GIFS = '/FavoriteGifs/GetAll';
const ADD_FAVORITE_GIF = '/FavoriteGifs/Add';
const DELETE_FAVORITE_GIF = '/FavoriteGifs/Delete?url=';
const SEND_MESSAGEFORM_URL = '/Message/CreateForm';
const GET_FILE = '/File/';
const MESSAGE_FRIENDS_URL = '/Message/GetAll?userId=';
const GET_MESSAGED_USERS_URL = '/PrivateMessage/Users';
const SEND_PRIVATE_MESSAGEFORM_URL = '/PrivateMessage/CreateForm';
const GET_ALL_MESSAGES_FROM_USER_URL = '/PrivateMessage/Get/';
const LEAVE_SERVER_URL = '/Server/LeaveServer?serverId=';
const GET_INC_INVITES = '/FriendInvitation/GetIncomingInvites';
const GET_OUt_INVITES = '/FriendInvitation/GetOutgoingInvites';
const INVITE_FRIEND_NAME = '/FriendInvitation/InviteByName?name=';
const ACCEPT_INVITE = '/FriendInvitation/Accept?otherId='

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

export const getUser = async (token: string, id: string) => {
        const response = await axios.get(
            BASE_URL+USER_GET_URL+id,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            },
        );
        return response;
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

export const getFile = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+GET_FILE+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

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

export const sendMessageForm = async (token: string, channelId: string, body: string, respondToId: string, attachment: File | null) => {
    const formData = new FormData();
    formData.append('ChannelId', channelId);
    formData.append('Body', body);
    formData.append('ResponseToId', respondToId);
    if (attachment) {
        formData.append('Attachment', attachment);
    }

    const response = await axios.post(
        BASE_URL+SEND_MESSAGEFORM_URL,
        formData,
        {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
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

export const editChannel = async (token: string, channelName: string, channelDescription: string, channelId: string) => {
    const response = await axios.patch(
        BASE_URL+EDIT_CHANNEL_URL+channelId,
        JSON.stringify({
            name: channelName,
            description: channelDescription,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
}

export const deleteChannel = async (token: string, id: string) => {
    const response = await axios.delete(
        BASE_URL+DELETE_CHANNEL_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const deleteMessage = async (token: string, id: string) => {
    const response = await axios.delete(
        BASE_URL+DELETE_MESSAGE_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const joinServer = async (token: string, name: string) => {
    const response = await axios.post(
        BASE_URL+JOIN_SERVER_URL+name,
        {},
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const deleteServer = async (token: string, id: string) => {
    const response = await axios.delete(
        BASE_URL+DELETE_SERVER_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getServerMembers = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+GET_SERVER_MEMBERS_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const kickUser = async (token: string, serverId: string, userId: string) => {
    const response = await axios.post(
        BASE_URL+KICK_USER_URL+serverId+'&userId='+userId,
        JSON.stringify({
            serverId: serverId,
            userId: userId,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
}

export const editUser = async (token: string, email: string, username: string, newPassword: string | null, password: string | null, avatar: File | null) => {
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Email', email);
    if (newPassword) {
        formData.append('NewPassword', newPassword);
    }
    if (password) {
    formData.append('Password', password);
    }
    if (avatar) {
        formData.append('Picture', avatar);
    }

    const response = await axios.post(
        BASE_URL+EDIT_USER,
        formData,
        {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
}

export const editServer = async (token: string, serverId: string ,name:string, description:string, avatar: File | null) => {
    if (avatar) {
        const formData = new FormData();
        formData.append('File', avatar);
        const response = await axios.post(
            BASE_URL+ADD_PICTURE+serverId,
            formData,
            {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            },
        );
    }
    const response = await axios.patch(
        BASE_URL+SERVER_EDIT+serverId,
        JSON.stringify({
            name: name,
            description: description,
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    
    return response;

}

export const getCurrent = async (token: string) => {
    const response = await axios.get(
        BASE_URL+'/User/GetCurrent',
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const getGifs = async (token: string, keyword: string) => {
    const response = await axios.get(
        BASE_URL+SEARCH_GIF+keyword,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const getFavoriteGifs = async (token: string) => {
    const response = await axios.get(
        BASE_URL+FAVORITE_GIFS,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const addFavoriteGif = async (token: string, gif: GifProps) => {
    const response = await axios.post(
        BASE_URL+ADD_FAVORITE_GIF,
        JSON.stringify({
            description: gif.description,
            gif: {
                url: gif.gifUrl,
                dims: {
                    width: gif.gifWidth,
                    height: gif.gifHeight,
                }
            },
            preview: {
                url: gif.previewUrl,
                dims: {
                    width: gif.previewWidth,
                    height: gif.previewHeight,
            },
            }
        }),
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const deleteFavoriteGif = async (token: string, gifUrl: string) => {
    const response = await axios.delete(
        BASE_URL+DELETE_FAVORITE_GIF+gifUrl,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}  

export const sendPrivateMessageForm = async (token: string, otherId: string, body: string, respondToId: string, attachment: File | null) => {
    const formData = new FormData();
    //formData.append('otherId', otherId);
    formData.append('Body', body);
    formData.append('ResponseToId', respondToId);
    if (attachment) {
        formData.append('Attachment', attachment);
    }

    const response = await axios.post(
        BASE_URL+SEND_PRIVATE_MESSAGEFORM_URL+'?otherId='+otherId,
        formData,
        {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getAllMessagesFromUser = async (token: string, id: string) => {
    const response = await axios.get(
        BASE_URL+GET_ALL_MESSAGES_FROM_USER_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
};

export const LeaveServer = async (token: string, serverId: string) => {
    const response = await axios.delete(
        BASE_URL+LEAVE_SERVER_URL+serverId,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
}

export const deletePrivateMessage = async (token: string, id: string) => {
    const response = await axios.delete(
        BASE_URL+DELETE_PRIVATE_MESSAGE_URL+id,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        },
    );
    return response;
};

export const getIncomingInvites = async (token: string) => {
    const response = await axios.get(
        BASE_URL+GET_INC_INVITES,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const getOutgoingInvites = async (token: string) => {
    const response = await axios.get(
        BASE_URL+GET_OUt_INVITES,
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        },
    );
    return response;
}

export const inviteFriendName = async (token: string, name: string) => {
    const response = await axios.post(
        
        BASE_URL+INVITE_FRIEND_NAME+name,
        
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

export const acceptInvite = async (token: string, id: string) => {
    const response = await axios.post(
        
        BASE_URL+ACCEPT_INVITE+id,
        
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