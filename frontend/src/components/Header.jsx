import SearchMsg from "./SearchMsg";
import LogoutButton from "./LogoutButton";
import {useUser} from "../context/userContext";
import { useState, useRef } from "react";
import "../css/Header.css";
import "../css/SearchMsg.css";
import logoOrganizasso from "../assets/logoOrganizasso.png";
import profileIcon from "../assets/profile_icon.svg";
import hamburger from "../assets/hamburger.svg";
import publicForumIcon from "../assets/public_forum_icon.svg";
import privateForumIcon from "../assets/private_forum_icon.svg";
import mulitUsersIcon from "../assets/mutiple_users_icon.svg";
import searchIcon from "../assets/search_icon.svg";

function Header({setMsgDateBegin, setMsgDateEnd, setMsgContent, setDisplayProfile, setDisplayAccountPage, setPrivateForum, setUserProfile, logoutFunction}){

    const user = useUser();
    const [toggleSearch, setToggleSearch] = useState(false);
    const buttonClicked = useRef(null);

    // useRef to keep track of the button clicked, to make the button active
    const handleButtonCliked = (e) => {

        if (buttonClicked.current) {
            buttonClicked.current.classList.remove("active");
        }

        e.currentTarget.classList.add("active");
        buttonClicked.current = e.currentTarget;
    }

    const handleSearchButtonClick = (e) => {
        if( buttonClicked.current) {
            buttonClicked.current.classList.remove("active");
        }
        !toggleSearch ? e.currentTarget.classList.add("active") : e.currentTarget.classList.remove("active");
    }

    // function to close the menu when clicking outside of it

    return (    
    <div className="header">

        <div className="logoZone">
            <img className="logo" src={logoOrganizasso} alt="logo" />
        </div>

        <div className="defaultSearch">
            <SearchMsg 
                setMsgContent={(content) => {setMsgContent(content)}} 
                setMsgDateBegin={(dateBegin) => {setMsgDateBegin(dateBegin)}} 
                setMsgDateEnd={(dateEnd) => {setMsgDateEnd(dateEnd)}}
            />
        </div>

        {!toggleSearch && 
            <div className="toggleLogoZone">
                <img className="logo" src={logoOrganizasso} alt="logo" />
            </div>
        }
        <div className="toggleSearch">
            {toggleSearch && <SearchMsg 
                                setMsgContent={(content) => {setMsgContent(content)}} 
                                setMsgDateBegin={(dateBegin) => {setMsgDateBegin(dateBegin)}} 
                                setMsgDateEnd={(dateEnd) => {setMsgDateEnd(dateEnd)}}
                            />
            }
        </div>

        <div className="toolbarZone">
            <button className="searchButton" ref={buttonClicked}
                onClick={ (e)=> {setDisplayAccountPage(false);
                            setDisplayProfile(false);
                            setPrivateForum(false);
                            setToggleSearch(!toggleSearch);
                            handleSearchButtonClick(e);}}>
                <img className="icon" src={searchIcon} alt="search icon" />

            </button>
            <button title="Forum public" className="" ref={buttonClicked}
                onClick={(e) => {setDisplayAccountPage(false);
                                setDisplayProfile(false);
                                setPrivateForum(false);
                                handleButtonCliked(e);}}>
                <img className="icon" src={publicForumIcon}/> <span className="visually-hidden">Forum public</span>
            </button>
            { user.user.isAdmin ? 
            <button title="Forum privé" className="" ref={buttonClicked}
                onClick={(e) => {setDisplayAccountPage(false);
                            setDisplayProfile(false);
                            setPrivateForum(true);
                            handleButtonCliked(e);}}
            ><img className="icon" src={privateForumIcon}/>  <span className="visually-hidden">Forum privé</span> </button> : <></> }
            <button title="Liste utilisateurs" className="" ref={buttonClicked}
                onClick={(e) => {setPrivateForum(false)
                            setDisplayProfile(false);
                            setDisplayAccountPage(true);
                            handleButtonCliked(e)}}
            ><img className="icon" src={mulitUsersIcon}/> <span className="visually-hidden">Liste utilisateurs</span></button>

            <button title="Mon profil" className="" ref={buttonClicked}
                    onClick={(e) => {setDisplayProfile(true);
                                    setDisplayAccountPage(false);
                                    setUserProfile(user.user.userId);
                                    handleButtonCliked(e);
                                    }
                            }
            ><img className="icon" src={profileIcon}/><span className="visually-hidden">Mon profil</span></button>
            <LogoutButton lougoutFunction={() => logoutFunction()}/>
        </div>

    </div>)
}

export default Header;