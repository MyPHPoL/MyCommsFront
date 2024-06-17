import * as signalR from "@microsoft/signalr";


export interface MessageResponse {
    id: number,
    channelId: number,
    authorId: string,
    body: string,
    creationDate: Date,
    attachment: string
}

export interface ChannelResponse {
    id: number,
    name: string,
    description: string | null,
    serverId: number
}

export interface SignalRClient {
    start(): Promise<void>
    stop(): void
    joinServer(serverId: number): void,
    leaveServer(serverId: number): void,
    onReceiveMessage(callback: (message: MessageResponse) => void): void,
    onDeleteMessage(callback: (messageId: number) => void): void,
    onCreateChannel(callback: (channel: ChannelResponse) => void): void,
    onDeleteChannel(callback: (channelId: number) => void): void,
    offReceiveMessage(): void
    offDeleteMessage(): void
    offCreateChannel(): void
    offDeleteChannel(): void
}

export class SignalRClientImpl implements SignalRClient {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7031/chatHub", {
                withCredentials: false
            })
            .withAutomaticReconnect()
            .build();
    }
    
    start(): Promise<void> {
        return this.connection.start();
    }
    
    stop(): void {
        this.connection.stop();
    }

    joinServer(serverId: number): void {
        this.connection.invoke("JoinServer", serverId);
    }

    leaveServer(serverId: number): void {
        this.connection.invoke("LeaveServer", serverId);
    }

    onReceiveMessage(callback: (message: MessageResponse) => void): void {
        this.connection.on("ReceiveMessage", callback);
    }

    onDeleteMessage(callback: (messageId: number) => void): void {
        this.connection.on("DeleteMessage", callback);
    }

    onCreateChannel(callback: (channel: ChannelResponse) => void): void {
        this.connection.on("CreateChannel", callback);
    }

    onDeleteChannel(callback: (channelId: number) => void): void {
        this.connection.on("DeleteChannel", callback);
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
}