import React from "react";
import "../index.css";
import { serverChannels, users } from "../fakedb";

export interface UserProps {
    id: string;
    name: string;
    picture?: string;
    creationDate: Date;
}

class User extends React.Component<{UserId: string}, any> {
    state: any = 
    {
            userId: this.props.UserId as string,
            user: users.find((user) => user.id === this.props.UserId) as UserProps,
    };
    render() {
        return (
        <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-20 bg-tertiary">
            <div className="flex items-center text-white text-3xl m-2 truncate h-10">
            {this.state.user?.picture ? (
                <img src={this.state.user?.picture} alt="No img" className="w-10 h-10 mr-2" />
            ) : null}
            {this.state.user?.name}
            </div>
            <div className="text-white text-1xl m-2 truncate">
            {this.state.user?.description}
            </div>
            <div className="text-white text-1xl m-2">
            User created on: {this.state.user?.creationDate}
            </div>
        </div>
        );
    }
}


//export default function User({id, name, picture, creationDate}: UserProps) {

//return(
    //<div>

    //</div>
      //);