import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function App() {

    const [user, setUser] = useState([])

    const nameRef = useRef()

    const emailRef = useRef()

    const LoadData = () => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/users")
                console.log(response.data)
                setUser(response.data)
            } catch (e) {
                console.error(e)
            }
        })()
    }
    useEffect(LoadData, [])


    const handleSubmit = e => {
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value

        //send data to server
        const newUser = {name, email}
        axios.post('http://localhost:5000/users',newUser)
            .then(response => {
                console.log(response.data)
                const addUser = response.data
                const newUser = [...user, addUser]
                setUser(newUser)
            })

       /* fetch('http://localhost:5000/users', {

            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const addUser = data
                const newUser = [...user, addUser]
                setUser(newUser)
            })*/

        nameRef.current.value = ''
        emailRef.current.value = ''
    }
    return (
        <div className="App">
            <h2>Found Users: {user.length}</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder='name'/>
                <input type="email" ref={emailRef} id="" placeholder='mail'/>
                <input type="submit" value="submit"/>
            </form>
            <ul>

                {
                    user.map(user => <li key={user.id}>{user.id + 1}:{user.name}: {user.email}</li>)
                }
            </ul>

        </div>
    );
}

export default App;
