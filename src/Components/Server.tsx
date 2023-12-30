import React from "react";
import "../index.css";

export interface ServerProps {
    id: string;
    name: string;
    description?: string;
    picture?: string;
    ownerId: string;
}

export default function Server({id, name, description, picture, ownerId}: ServerProps) {

return(
    <div></div>
      );
};