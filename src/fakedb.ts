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
      authorId: '6c2e2119-91d9-4c06-b7c5-d6226237698a',
      body: 'Hello world!',
      creationDate: new Date().toDateString(),
      attachment: null,
    },
    {
      id: '2',
      authorId: '6c2e2119-91d9-4c06-b7c5-d6226237698a',
      body: 'This is a test message',
      creationDate: new Date().toDateString(),
      attachment: null,
    },
    {
      id: '3',
      authorId: '6c2e2119-91d9-4c06-b7c5-d6226237698a',
      body: 'This is another test message',
      creationDate: new Date().toDateString(),
      attachment: null,
    },
    {
      id: '4',
      authorId: '6c2e2119-91d9-4c06-b7c5-d6226237698a',
      body: 'This is a test message from a different user',
      creationDate: new Date().toDateString(),
      attachment: null,
    },
];