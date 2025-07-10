import { useState} from 'react'
import '../css/App.css'
import MainPage from "./MainPage.jsx"
import LoginSignup from "./LoginSignup.jsx"
import { useUser } from '../context/userContext.jsx'

// root of the componant tree
function App() {

  // when a user go the website he is disconected and not admin by default
  const [isConnected, setConnexion] = useState(false );
  const [isAdmin, setAdmin] = useState(false);

  //pour effacer le context d'user qui a été remplit pendant le login
  const {eraseUserInfo} = useUser();

  // return the main page, if the user is connected else return the LoginSignup page
  return isConnected ? 
                      <MainPage logoutFunction={() => {setConnexion(false); eraseUserInfo();}} />
                      :
                      <LoginSignup loginFunction={() => setConnexion(true)} setAdminFunction={() => setAdmin(true)} />;
}

export default App;
