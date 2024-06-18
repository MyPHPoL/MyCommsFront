import * as signalR from "@microsoft/signalr";


export interface MessageResponse {
    id: string,
    channelId: string,
    authorId: string,
    body: string,
    creationDate: string,
    attachment: string | null
}

export interface ChannelResponse {
    id: string,
    name: string,
    description: string | null,
    serverId: string
}

export interface ServerResponse {
    id: string,
    name: string,
    description: string
}

export interface PrivateMessageResponse {
    id: string,
    authorId: string,
    receiverId: string,
    body: string,
    creationDate: string
}

export interface SignalRClient {
    start(): Promise<void>
    stop(): Promise<void>,
    joinServer(serverId: string): Promise<void>,
    leaveServer(serverId: string): Promise<void>,
    joinFriend(friendId: string): Promise<void>,
    leaveFriend(friendId: string): Promise<void>,
    onReceiveMessage(callback: (message: MessageResponse) => void): void,
    onDeleteMessage(callback: (messageId: string) => void): void,
    onCreateChannel(callback: (channel: ChannelResponse) => void): void,
    onDeleteChannel(callback: (channelId: string) => void): void,
    onEditChannel(callback: (channel: ChannelResponse) => void): void,
    onEditServer(callback: (server: ServerResponse) => void): void,
    onCreatePrivateMessage(callback: (message: PrivateMessageResponse) => void): void,
    onDeletePrivateMessage(callback: (messageId: string) => void): void,
    offReceiveMessage(): void,
    offDeleteMessage(): void,
    offCreateChannel(): void,
    offDeleteChannel(): void,
    offEditChannel(): void,
    offEditServer(): void,
    offCreatePrivateMessage(): void,
    offDeletePrivateMessage(): void,
}

export class SignalRClientImpl implements SignalRClient {
    private connection: signalR.HubConnection;

    constructor(token: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7031/chatHub", {
                withCredentials: true,
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();
    }
    
    start(): Promise<void> {
        this.connection.on("dummy", () => {});
        return this.connection.start();
    }
    
    stop(): Promise<void> {
        this.connection.off("dummy");
        return this.connection.stop();
    }

    joinServer(serverId: string): Promise<void> {
        return this.connection.invoke("JoinServer", serverId);
    }

    leaveServer(serverId: string): Promise<void> {
        return this.connection.invoke("LeaveServer", serverId);
    }
    
    joinFriend(friendId: string): Promise<void> {
        return this.connection.invoke("JoinFriend", friendId);
    }

    leaveFriend(friendId: string): Promise<void> {
        return this.connection.invoke("LeaveFriend", friendId);
    }

    onReceiveMessage(callback: (message: MessageResponse) => void): void {
        this.connection.on("ReceiveMessage", callback);
    }

    onDeleteMessage(callback: (messageId: string) => void): void {
        this.connection.on("DeleteMessage", callback);
    }

    onCreateChannel(callback: (channel: ChannelResponse) => void): void {
        this.connection.on("CreateChannel", callback);
    }

    onDeleteChannel(callback: (channelId: string) => void): void {
        this.connection.on("DeleteChannel", callback);
    }
    
    onEditChannel(callback: (channel: ChannelResponse) => void): void {
        this.connection.on("EditChannel", callback);
    }
    
    onEditServer(callback: (server: ServerResponse) => void): void {
        this.connection.on("EditServer", callback);
    }
    
    onCreatePrivateMessage(callback: (message: PrivateMessageResponse) => void): void {
        this.connection.on("ReceivePrivateMessage", callback);
    }

    onDeletePrivateMessage(callback: (messageId: string) => void): void {
        this.connection.on("DeletePrivateMessage", callback);
    }
    
    offReceiveMessage(): void {
        this.connection.off("ReceiveMessage");
    }
    
    offDeleteMessage(): void {
        this.connection.off("DeleteMessage");
    }

    offCreateChannel(): void {
        this.connection.off("CreateChannel");
    }

    offDeleteChannel(): void {
        this.connection.off("DeleteChannel");
    }
    
    offEditChannel(): void {
        this.connection.off("EditChannel");
    }

    offEditServer(): void {
        this.connection.off("EditServer");
    }
    
    offCreatePrivateMessage(): void {
        this.connection.off("ReceivePrivateMessage");
    }

    offDeletePrivateMessage(): void {
        this.connection.off("DeletePrivateMessage");
    }
}