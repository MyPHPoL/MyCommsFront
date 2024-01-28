import { MessageProps } from "./Components/Channel";
import { UserProps } from "./Components/User";

export const friends: UserProps[] = [
    {
      id: 'test1',
      username: 'test user',
      email: 'https://cdn.7tv.app/emote/639938bf1e2f45552fe4fa03/4x.png',
      creationDate: new Date(),
    },
  ];


export const messages: MessageProps[] = [
    {
      id: '1',
      authorId: 'test1',
      body: 'Hello world!',
      creationDate: new Date().toDateString(),
    },
    {
      id: '2',
      authorId: 'test1',
      body: 'This is a test message',
      creationDate: new Date().toDateString(),
    },
    {
      id: '3',
      authorId: 'test1',
      body: 'This is another test message',
      creationDate: new Date().toDateString(),
    },
    {
      id: '4',
      authorId: 'test1',
      body: 'This is a test message from a different user',
      creationDate: new Date().toDateString(),
    },
];