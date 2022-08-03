import { AuthContext } from '../context/AuthContext';
import { useContext, useReducer ,useEffect, useState, useRef } from "react";
import Popup from '../components/popup';
import axios from 'axios';
import Rooms from '../components/room';
// import { useLocalStorage } from '../hooks/useLocalStorege';
import {io} from 'socket.io-client'
//import {useNavigate,useLocation,Navigate} from 'react-router-dom'
function ChatRoom() {
    // const location = useLocation()
    const state = useContext(AuthContext)
    // const [loc,updLoc]= useLocalStorage("rooms",[])
    const [isTriggerOn,setTriggerOn] = useState(false)
    const [req,setReq] = useState(false)
    const [name,setName] = useState("")
    const [R,setR] = useState(null)
    const [rooms,setRooms] = useState(null)
    const [selectedRoom,setSelectedRoom] = useState(null)
    const inp = useRef()
    let DATA = useRef()
    
    // const  setInit =(val)=>val

    

    // const initialState ={rooms:JSON.parse(localStorage.getItem("rooms")).length ===0 ? []:JSON.parse(localStorage.getItem("rooms"))};

    // const reducer = (state,action)=>{
    //     switch (action.type){
    //         case "add":
    //             let ret = [...state.rooms]
    //             ret.push(action.id)
    //             return {rooms:ret}
    //         default:
    //             throw new Error();
    //     }
    // };
    // const [room, dispatch] = useReducer(reducer, initialState);

    
    
    const useTrigger = ()=>setTriggerOn(!isTriggerOn)
    const getName= async () =>{
        let res = await axios.post("http://localhost:3001/name",{
            token:state.token
        })

        let data = res.data
        console.log(data);
        setName(data)
    }
    const getRooms= async () =>{
        let res = await axios.put("http://localhost:3001/room",{
            token:state.token,
            rooms:R 
        })
        let data = res.data
        console.log(data);
        setRooms(data)
    }
    useEffect(()=>{
        getName()
        getRooms()
    },[R])
    
    return ( 
        <>
    {
                state.token=== null ?
                <h1 className='error not-allowed' >UnAuthorized access Permission denied</h1>:

        <div className="chatRoom" >
            <section className="sidebar">
                <nav>
                    <h4>{name}</h4>
                    <button 
                            onClick={e=>{
                                setTriggerOn(true)
                                setReq(
                                    <>
                                        <input 
                                            placeholder='Enter Room name'
                                            ref={inp}
                                        />
                                        <button 
                                            className="toggle" 
                                            onClick={e=>{
                                                setTriggerOn(false)
                                                setR(inp.current.value)                                                // updLoc(room.rooms)
                                            }}
                                        >JOIN</button>
                                    </>
                                )
                            }}
                            className="toggle">
                        Join Room
                    </button>
                    {
                        isTriggerOn && <Popup
                        content={ req }
                        handleClose={useTrigger}
                    />
                    }
                </nav>
               <h1 className='ids'style={{"fontSize":"1.3rem","cursor":"text"}}>Frequently Joined Rooms (plz click the room name to join!)</h1>
               <div style={{"display":"flex","flexDirection":"column"}}>
                    {  rooms && 
                        rooms.map(e=> {
                        console.log(rooms);
                        return  e!=null ?<button onClick={eve=>setSelectedRoom(e)} className='ids'>{e}</button>:<></>
                    })
                        
                    }                
               </div>
            </section>
            <section className="room" ref={DATA}>
                {
                    selectedRoom != null ? 
                    <Rooms
                        id={selectedRoom}
                        userName={name}
                        parent={DATA}
                    />:<></>
                }
            </section>
        </div>
    }
        </>
        
    );
}

export default ChatRoom;

// window.setInterval(function() {
//     console.log(DATA.current);
//     DATA.current.scrollTop = DATA.current.scrollHeight;
//   },5000);
/* {room.rooms.length===0 ?
                        !loc? <h1 className='ids'>No Rooms</h1> :loc.map(e=> <button onClick={eve=>setSelectedRoom(e)} className='ids' >{e}</button>):
                        room.rooms.map(e=> <button onClick={eve=>setSelectedRoom(e)} className='ids'>{e}</button>)} */