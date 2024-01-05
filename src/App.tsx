import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { ServerProps } from "./Components/Server";
import { UserProps } from "./Components/User";

export const servers: ServerProps[] = [
    {
      id: 'id-test',
      name: 'MyCommsFront',
      description: 'A React client powered by MyPHPoL',
      ownerId: 'ownerId-test'
    },
    {
      id: 'id-test2',
      name: 'server2',
      description: 'Opis servera2',
      picture: 'https://cdn.7tv.app/emote/63eba1b7b482c20fd932a293/4x.png',
      ownerId: 'ownerId-test2'
    },
    {
      id: 'id-test3',
      name: 'getto',
      description: 'Opis servera2',
      picture: 'https://cdn.frankerfacez.com/emoticon/513200/4',
      ownerId: 'ownerId-test2'
    },
    {
      id: 'id-test4',
      name: 'MyCommsFront',
      description: 'A React client powered by MyPHPoL',
      ownerId: 'ownerId-test'
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

function App(){
    return (
        <div className="flex">
          <Header></Header>
          <Outlet/>
        </div>
    );
}

export default App;