import { useEffect,useState } from "react";

import Login from "./pages/login";
import Singin from "./pages/signIn";
import img from './images/mobile-app.png'
import ChatRoom from "./pages/chatRoom";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from './context/AuthContext';

function App() {
  const [isLogged,setLogged] = useState(false)
  const  [token,setToken] = useState(()=>sessionStorage.getItem("token"));
  return (
    <AuthContext.Provider value={{isLogged,setLogged,token,setToken}} >
      <nav className="title">
          <img width='80px' src={img}/ >
          <h1 className="heading">The Chat App</h1>
      </nav>
      <Routes>
        <Route element={<Login/>} path="/"/>
        <Route element={<Singin/>} path="/singup"/>
        <Route element={<ChatRoom/>} path="/account"/>
      </Routes>
    </AuthContext.Provider>
  )
}

export default App;



