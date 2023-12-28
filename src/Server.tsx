import React from "react";
import "./index.css";
import Button from '@mui/material/Button';

interface ServerProps {
    id: string;
    name: string;
    description?: string;
    picture?: string;
    ownerId: string;
}

export default function Server({id, name, description, picture, ownerId}: ServerProps) {

return(
	<div style={{margin: '20px'}}>
        <Button size="medium" variant="contained">{name}</Button>
	</div>
      );
};