import { useRef } from "react";
import { useEffect ,useState,useReducer} from "react";
import { io } from "socket.io-client";

function Rooms({id,userName,parent}) {
    const socket = io("ws://localhost:3001");
    const [message,setMsg]=useState("")
    const initialState =[];
    const inp = useRef()
    function reducer(state,action){
        switch (action.type){
            case "add":
                let ret = [...state]
                ret.push({message:action.message,by:action.by})
                return ret   
            case "changed" :
                let init=[]
                return init
        }
    }
    const [MESSAGES, dispatch] = useReducer(reducer, initialState);
    useEffect(()=>{
        dispatch({type:"changed"})
        socket.on("connectionSuccess",()=>console.log("Success......"))
        if(id!=null){
            console.log("joined",id);
            socket.emit("joinRoom",{roomId:id,userName})
        }
        socket.on("newUserJoined",({roomId,userName})=>{
            console.log(roomId,userName);
        })
        socket.on("receivedMsg",({message,by,roomId})=>{
            if(id==roomId){
                dispatch({type:"add",message,by})
            }
        })
    },[id]);
    useEffect(()=>{
        parent.current.scrollTop = parent.current.scrollHeight;
    },[MESSAGES]);
    
    return ( 
        <div onKeyPress={e=>{
            console.log(e.key);
            if(e.key == "Enter"){
                if(message === "")
                    return alert("Please Type some message")
                inp.current.value = ""
                socket.emit("sendMsg",{message,roomId:id,by:userName});
                
            }
        }}>
            <h1 >You Joined <span style={{"color":"grey"}}>{id}</span> room</h1>
            <div className="holder">
                <input ref={inp}  onChange={e=>setMsg(e.target.value)} type="text" placeholder="Enter your message here"  className="btm" />
                <button
                    onClick={e=>{
                        console.log("sms emmited");
                        if(message === "")
                            return alert("Please Type some message")
                        socket.emit("sendMsg",{message,roomId:id,by:userName})
                        inp.current.value = ""
                        console.log(inp);
                        
                    }}
                >Send</button>
            </div>
            <div className="messages">
                { 
                    MESSAGES.map(ele=>{
                        console.log(ele)
                        return <>
                            <div className="msg-holder"  style={{"marginLeft":ele.by===userName? "50%":"0"} }>
                                <h4>Send by : {ele.by===userName? "You":ele.by}</h4>
                                <h3>{ele.message}</h3>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
     );
}

export default Rooms;