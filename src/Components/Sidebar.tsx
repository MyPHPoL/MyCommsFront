import React from 'react';
import StyledButton from './StyledButton';

interface SidebarProps {
    items: any[];
}

export default function Sidebar({items}: SidebarProps) {
    return(
        <div className="fixed h-full top-20 left-0 w-30 m-0 flex flex-col bg-primary shadow-lg">
            <ul>
                <i>{items.map(el=><StyledButton name={el.name} picture={el.picture}></StyledButton>)}</i>
            </ul>
        </div>
    );
}