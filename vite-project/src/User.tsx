import { useState } from "react";
import "./User.css"

interface User {
    // id?: number;
    isim: string;
    email:string;
    sifre:string;
};

function UserList(){
const [users, setUsers] = useState<User[]>([]);
const [newUsers, setNewUsers] = useState<User>({isim:"",email:"",sifre:""})

const addUsers = () => {
    if(newUsers){
       setUsers([...users, newUsers]);
       setNewUsers({isim:"",email:"", sifre:""});
    };
}

return(
    <div>  
        <h1>salam</h1>

        <ul>
        <input type="text"></input>
        </ul>
        <ul>
        <input type="email"></input>
        </ul>
        <ul>
        <input type="password"></input>
        </ul>
     <button onClick={addUsers}>elave et</button>
    </div>
)




}export default UserList;
