import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from "stream-chat";
import { Chat } from 'stream-chat-react';
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from './components/joinGame';

function App() {
  const api_key = "7ktp6quxgpx4";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          //id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstname"),
          lastName: cookies.get("lastname"),
          hashedPassword: cookies.get("hashedPassword")
        },
        token
      ).then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
        <>

          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
