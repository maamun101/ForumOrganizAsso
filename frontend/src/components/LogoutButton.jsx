import axios from 'axios';
import {useState} from 'react';
import logoutIcon from '../assets/logout.svg';

axios.defaults.baseURL = "http://localhost:8000";

function LogoutButton({lougoutFunction}){

    // state contenant les messages d'erreur
    const [errorMsg, setErrorMsg] = useState();

    // fonction qui fait une requête vers le serveur pour faire la deconexion
    const logout = () => {

        axios.post("user/logout", {}, {withCredentials: true})
        .then(response => {
            lougoutFunction();
        }).catch(error => {
            setErrorMsg(error.response.data.message);
        });

    };

    return (<>
        <button title='Se déconnecter' onClick={() => logout()} ><img className='icon' src={logoutIcon} /><span className="visually-hidden">Logout</span></button>
        {({errorMsg} && <p>{errorMsg}</p>)}
    </>)

}

export default LogoutButton;