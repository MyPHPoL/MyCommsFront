import React from 'react';
import { useParams } from 'react-router-dom';
import { channels } from '../fakedb';

export interface ChannelProps {
    id: string;
    name: string;
    description?: string;
}

function Channel() {
    const { ChannelId } = useParams();
    const Channel: ChannelProps | undefined = channels.find((channel) => channel.id === ChannelId);
    return (
        <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-[380px]'>
            <div className='text-5xl shadow-sg tracking-wider font-semibold text-white ml-2 my-auto;'>You are at {Channel?.name} channel!</div>
        </div>
    );
};

export default Channel;
  