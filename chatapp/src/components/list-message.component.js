import { useEffect, useState } from "react";
import config from "../config";
import socketIOClient from "socket.io-client";
export function ListMessage(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let data = localStorage.getItem("login");
    console.log(data);
    const requestOptions = {
      method: 'POST',                    
      headers: {
        'Authorization': 'Basic '+JSON.parse(data).token, 
        'Content-Type': 'application/json', 'Accept':'application/json'},
      body: JSON.stringify({creatorId:JSON.parse(data).userId,to:props.contactId})
    };
    const socket = socketIOClient(config.serverURL);

    const [msn, setMsn] = useState("Write the message ...");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        items.push(msn);
        setItems(items);
        socket.emit("message",{message:msn, userId:JSON.parse(data) ,id:props.contactId});
        console.log("MESSAGE send");
    }
    useEffect(() => {
        //sockets
        
        socket.on("message", data => {
          console.log("ONMESSAGE");
          items.push(data);
          setItems(items);
        });

        socket.emit("code",{code:JSON.parse(data).userId});

        fetch(`${config.serverURL}/chat/message`,
        requestOptions
        )
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
          
          // CLEAN UP THE EFFECT
          return () => socket.disconnect();
      }, [])
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <>
            <h2>MESSAGE OF - {props.nameContact}</h2>
            <ul>
              {items.map(item => (
                <li key={item._id}>
                  {item.message}
                  {item.createAt}
                </li>
              ))}

              
              <li>
                                                                                
    <form onSubmit={handleSubmit}>
      <label>        
        <input
          type="text"
          value={msn}
          onChange={e => setMsn(e.target.value)}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
              </li>
            </ul>
          </>
        );
      }
}