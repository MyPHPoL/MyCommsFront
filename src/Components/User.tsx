import React from "react";
import "../index.css";

export interface UserProps {
    id: string;
    name: string;
    picture?: string;
    creationDate: Date;
}

export default function User({id, name, picture, creationDate}: UserProps) {

return(
    <div>

    </div>
      );
};