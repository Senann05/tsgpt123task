import { useState, useEffect } from "react";
import "./User.css";

interface User {
    id: number;
    isim: string;
    email: string;
    sifre: string;
}

function UserList() {
    const [users, setUsers] = useState<User>({ id: 0, isim: "isim", email: "mail", sifre: "sifre" });
    const [mistakes, setMistakes] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [userList, setUserList] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const savedUsers = localStorage.getItem("userList");
        if (savedUsers) {
            setUserList(JSON.parse(savedUsers)); 
        }
    }, []);

    const saveToLocalStorage = (updatedUserList: User[]) => {
        localStorage.setItem("userList", JSON.stringify(updatedUserList)); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (users.isim.length < 3) {
            setMistakes("İsim geçersiz");
            setSuccessMessage(""); 
            return;
        }
        if (!users.email.includes("@")) {
            setMistakes("Geçersiz email");
            setSuccessMessage(""); 
            return;
        }
        if (users.sifre.length < 6) {
            setMistakes("Geçersiz şifre");
            setSuccessMessage("");
            return;
        }

        let updatedUserList;

        if (users.id !== 0) {
            updatedUserList = userList.map(user => user.id === users.id ? users : user);
            setSuccessMessage("Kullanıcı başarıyla güncellendi!"); 
        } else {
            updatedUserList = [...userList, { ...users, id: Date.now() }];
            setSuccessMessage("Kullanıcı başarıyla eklendi!"); 
        }

        setUserList(updatedUserList);
        saveToLocalStorage(updatedUserList);
        setMistakes("");
        setUsers({ id: 0, isim: "", email: "", sifre: "" }); 
    };

    const handleDelete = (id: number) => {
        const updatedUserList = userList.filter(user => user.id !== id);
        setUserList(updatedUserList);
        saveToLocalStorage(updatedUserList);
        setSuccessMessage("Kullanıcı başarıyla silindi!");
    };

    const handleEdit = (user: User) => {
        setUsers({
            id: user.id,
            isim: user.isim,
            email: user.email,
            sifre: user.sifre
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = userList.filter(user =>
        user.isim.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Users</h1>

            <input 
                type="text" 
                placeholder="Kullanıcı Ara" 
                value={searchTerm} 
                onChange={handleSearchChange} 
            />

            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>
                        {user.isim} - {user.email}
                        <button onClick={() => handleEdit(user)}>Düzenle</button>
                        <button onClick={() => handleDelete(user.id)}>Sil</button>
                    </li>
                ))}
            </ul>

            <input type="text" name="isim" value={users.isim} onChange={handleChange} />
            <input type="email" name="email" value={users.email} onChange={handleChange} />
            <input type="password" name="sifre" value={users.sifre} onChange={handleChange} />
            <button onClick={handleSubmit}>{users.id !== 0 ? "Güncelle" : "Ekle"}</button>

            {mistakes && <p style={{ color: "red" }}>{mistakes}</p>}

            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
}

export default UserList;
