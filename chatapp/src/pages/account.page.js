import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LoginForm } from "../components/forms/login.form"
import { RegisterForm } from "../components/forms/register.form";
import config from "../config";

export function AccountPage(props){
                
    let history = useHistory();
    return (
        <>
            <LoginForm submit={(data)=>{ 
                console.log(JSON.stringify(data));                               
                const requestOptions = {
                    method: 'POST',                    
                    headers: { 'Content-Type': 'application/json', 'Accept':'application/json'},
                    body: JSON.stringify(data)
                };
                fetch(`${config.serverURL}/user/login`, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log("logeado",data);
                    localStorage.setItem("login",JSON.stringify(data));
                    history.replace('/');  
                })               
                .catch(error => { 
                    console.log("ERROR");                   
                });                 
            }}/>

            <RegisterForm submit={(data)=>{ 
                console.log(JSON.stringify(data));                               
                const requestOptions = {
                    method: 'POST',                    
                    headers: { 'Content-Type': 'application/json', 'Accept':'application/json'},
                    body: JSON.stringify(data)
                };
                fetch(`${config.serverURL}/user/register`, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log("registrado",data);
                    localStorage.setItem("login",JSON.stringify(data));
                    history.replace('/');  
                })
                .catch(error => { 
                    console.log("ERROR",error);                   
                });                 
            }}/>
        </>
    );
}