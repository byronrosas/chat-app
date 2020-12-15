import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ListMessage } from "../components/list-message.component";
import { ListUsers } from "../components/list-user.component";
import config from "../config";

export function ChatPage(props){
    let history = useHistory();
    return (
        <>
        <h1>Chat Page - {JSON.parse(localStorage.getItem("login")).username}</h1>
        <button onClick={()=>{
            localStorage.removeItem("login");
            history.replace('/login');
        }}>Logout</button>
            <ListUsers/>             
        </>
    );
}