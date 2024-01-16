import { ChannelProps, MessageProps } from "./Components/Channel";
import { ServerProps } from "./Components/Server";
import { UserProps } from "./Components/User";

export const servers: ServerProps[] = [
    {
      id: 'id-test',
      name: 'MyCommsFront',
      description: 'A React client powered by MyPHPoL',
      ownerId: 'ownerId-test',
      users: ['ownerId-test', 'ownerId-test2']
    },
    {
      id: 'id-test2',
      name: 'POWAGA',
      description: 'SKOŃCZYMY TEGO REACTA',
      picture: 'https://cdn.7tv.app/emote/63eba1b7b482c20fd932a293/4x.png',
      ownerId: 'ownerId-test2',
      users: ['ownerId-test', 'ownerId-test2']
    },
    {
      id: 'id-test3',
      name: 'getto',
      description: 'tutaj planujemy zbrodnie',
      picture: 'https://cdn.frankerfacez.com/emoticon/513200/4',
      ownerId: 'ownerId-test2',
      users: ['ownerId-test', 'ownerId-test2']
    },
    {
      id: 'id-test4',
      name: 'test',
      description: 'testowy serwer',
      ownerId: 'ownerId-test',
      users: ['ownerId-test', 'ownerId-test2']
    },
  ];

export const friends: UserProps[] = [
    {
      id: '1',
      name: 'test user',
      picture: 'https://cdn.7tv.app/emote/639938bf1e2f45552fe4fa03/4x.png',
      creationDate: new Date(),
    },
    {
      id: '2',
      name: 'test user2',
      creationDate: new Date(),
    },
  ];

export const serverChannels = [
  {
    serverId: 'id-test',
    channels: [
      {
        id: '1',
        name: 'general channel',
        description: 'general channel for all your needs',
      },
      {
        id: '2',
        name: 'memes',
        description: 'best memes in your area',
      },
    ],
  },
  {
    serverId: 'id-test2',
    channels: [
      {
        id: '3',
        name: 'shitpost',
        description: 'xdx',
      },
      {
        id: '4',
        name: 'gowno',
        description: 'rozmowki o gownie',
      },
    ],
  },
  {
    serverId: 'id-test3',
    channels: [
      {
        id: '3',
        name: 'general1',
        description: 'channel1',
      },
      {
        id: '4',
        name: 'general2',
        description: 'channel2',
      },
      {
        id: '6',
        name: 'general3',
        description: 'channel3',
      },
      {
        id: '9',
        name: 'general4',
        description: 'channel4',
      },
    ],
  },
  {
    serverId: 'id-test4',
    channels: [
      {
        id: '3',
        name: 'general3',
        description: 'general channel',
      },
      {
        id: '4',
        name: 'general4',
        description: 'general channel2',
      },
    ],
  },
];

export const users: UserProps[] = [
  {
    id: 'ownerId-test',
    name: 'test user',
    picture: 'https://cdn.7tv.app/emote/639938bf1e2f45552fe4fa03/4x.png',
    creationDate: new Date(),
  },
  {
    id: 'ownerId-test2',
    name: 'test user2',
    creationDate: new Date(),
  },
];


export const channels: ChannelProps[] = [
  {
    id: '1',
    name: 'general channel',
    description: 'general channel for all your needs',
  },
  {
    id: '2',
    name: 'memes',
    description: 'best memes in your area',
  },
  {
    id: '3',
    name: 'shitpost',
    description: 'xdx',
  },
  {
    id: '4',
    name: 'gowno',
    description: 'rozmowki o gownie',
  },
  {
    id: '5',
    name: 'general1',
    description: 'channel1',
  },
  {
    id: '6',
    name: 'general2',
    description: 'channel2',
  },
  {
    id: '7',
    name: 'general3',
    description: 'channel3',
  },
  {
    id: '8',
    name: 'general4',
    description: 'channel4',
  },
  {
    id: '9',
    name: 'general3',
    description: 'general channel',
  },
  {
    id: '10',
    name: 'general4',
    description: 'general channel2',
  },
];

export const messages: MessageProps[] = [
  {
    id: '1',
    author: 'piotrula',
    content: 'Hello world!',
    timestamp: '20:00',
  },
  {
    id: '2',
    author: 'servedren',
    content: 'Hello world!',
    timestamp: '13:00',
  },
  {
    id: '3',
    author: 'sos carbonare',
    content: 'elo',
    timestamp: '14:00',
  },
  {
    id: '4',
    author: 'syadaisu',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat blandit magna vel dapibus. Suspendisse quam risus, egestas eu ligula at, pretium consequat eros. Sed accumsan risus consectetur tristique commodo. Duis et laoreet neque, eu bibendum ipsum. Vivamus ultrices eu orci eu porttitor. ',
    timestamp: '15:00',
  },
  {
    id: '5',
    author: 'piotrula',
    content: 'Vestibulum dignissim tortor vel nisl luctus tincidunt. Aliquam dolor nulla, rhoncus vitae venenatis sed, vestibulum in quam. Mauris nisi magna, bibendum nec commodo non, tempus nec lacus. Phasellus posuere pretium sapien, ac feugiat leo ullamcorper vitae. Maecenas pulvinar ipsum ut posuere placerat. In in pulvinar elit, ut convallis nisi. Vestibulum elementum consectetur lectus, placerat vestibulum mauris viverra vitae. Donec ac quam et mi dapibus iaculis dignissim ut turpis. Quisque tristique dui sit amet urna placerat rhoncus. ',
    timestamp: '16:00',
  },
  {
    id: '6',
    author: 'servedren',
    content: 'Maecenas tempus vitae nulla et blandit. Suspendisse volutpat ullamcorper tortor eget dapibus. Etiam imperdiet augue vel magna lacinia, ut iaculis nunc bibendum. Morbi sed nibh a justo hendrerit congue et eu elit. Suspendisse in neque est. Vivamus ac tortor gravida, mattis elit vitae, commodo augue. Donec interdum, nunc quis rutrum ultrices, orci augue vehicula magna, non dictum nunc risus a turpis. Suspendisse sed purus id mi venenatis porta ut id quam. Nullam condimentum vestibulum augue nec cursus. ',
    timestamp: '17:00',
  },
  {
    id: '7',
    author: 'sos carbonare',
    content: 'Maecenas tempus vitae nulla et blandit. Suspendisse volutpat ullamcorper tortor eget dapibus. Etiam imperdiet augue vel magna lacinia, ut iaculis nunc bibendum. Morbi sed nibh a justo hendrerit congue et eu elit. Suspendisse in neque est. Vivamus ac tortor gravida, mattis elit vitae, commodo augue. Donec interdum, nunc quis rutrum ultrices, orci augue vehicula magna, non dictum nunc risus a turpis. Suspendisse sed purus id mi venenatis porta ut id quam. Nullam condimentum vestibulum augue nec cursus. ',
    timestamp: '18:00',
  }
  ];