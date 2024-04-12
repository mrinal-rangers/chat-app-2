import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'; // Only needed if you're using the history object

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const history = useHistory(); // Only needed if you're using the history object

  const [user, setUser] = useState(); // Add type annotation for user state

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Corrected spelling
    setUser(userInfo);
    if (!userInfo) history.push("/"); // Only needed if you're using the history object
  }, [history]); // Only needed if you're using the history object

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;