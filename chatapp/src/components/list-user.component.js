import { listenerCount } from "process";
import { useEffect, useState } from "react";
import config from "../config";
import { ListMessage } from "./list-message.component";

export function ListUsers(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [idContact, setIdContact] = useState(null);
    const [contactName, setContactName] = useState(null);
    let data = localStorage.getItem("login");
    console.log(JSON.parse(data).token);
    useEffect(() => {
        fetch(`${config.serverURL}/chat/contacts`,{
          method: 'get', 
          headers: new Headers({            
            'Authorization': 'Basic '+JSON.parse(data).token, 
            'Content-Type': 'application/json', 
            'Accept':'application/json'
          }), 
        })
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },            
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <>
          <h2>CONTACTS</h2>
            <ul>
              {items.map(item => (
                <li key={item._id}>
                <button onClick={()=>{
                  setIdContact(item._id);
                  setContactName(item.username);
                }}>{item.username}</button>
                </li>
              ))}
            </ul>
            <ListMessage nameContact = {contactName == null ? JSON.parse(data).username : contactName} contactId = {idContact == null ? JSON.parse(data).userId : idContact}/>
          </>
        );
      }
}