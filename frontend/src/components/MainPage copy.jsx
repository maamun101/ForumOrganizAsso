import {useEffect, useState} from 'react'
import Forum from './Forum.jsx'
import Profile from './Profile.jsx'
import Header from './Header.jsx';
import AccountPage from './AccountPage.jsx'

function MainPage({ logoutFunction }) {
  const [isProfilePage, setIsProfilePage] = useState(false);

    const [privateForum, setPrivateForum] = useState(false);
    const [displayProfile, setDisplayProfile] = useState(false);
    const [userProfile, setUserProfile] = useState("");
    const [displayAccountPage, setDisplayAccountPage] = useState(false);

    const [msgContent, setMsgContent] = useState();
    const [msgDateBegin, setMsgDateBegin] = useState();
    const [msgDateEnd, setMsgDateEnd] = useState();

    let headerProps = {
        logoutFunction: () => logoutFunction(),
        setMsgContent : (content) => setMsgContent(content),
        setMsgDateBegin : (dateBegin) => setMsgDateBegin(dateBegin),
        setMsgDateEnd : (dateEnd) => setMsgDateEnd(dateEnd),
        setDisplayProfile : (bool) => setDisplayProfile(bool),
        setDisplayAccountPage : (bool) => setDisplayAccountPage(bool),
        setPrivateForum : (priv) => setPrivateForum(priv),
        setUserProfile : (userId) => setUserProfile(userId)
    };


    return (
    <div>

        <Header {...headerProps} />
        
        <div className="section">

            <div className="contentZone">
                { displayProfile ? 
                <Profile
                  userId={userProfile}
                  setDisplayProfile={(bool) => setDisplayProfile(bool)}
                  setUserProfile={(userId) => setUserProfile(userId)}
                /> : 
                displayAccountPage ? 
                
                <AccountPage
                  setDisplayAccountPage={(bool) => setDisplayAccountPage(bool)}
                  setDisplayProfile={(bool) => setDisplayProfile(bool)}
                  setUserProfile={(userId) => setUserProfile(userId)}
                /> :
                
                <Forum 
                  isPrivate={privateForum}
                  setDisplayProfile={(bool) => {setDisplayProfile(bool)}}
                  setUserProfile={(userId) => {setUserProfile(userId)}}
                  msgSearchContent={msgContent}
                  dateBegin={msgDateBegin}
                  dateEnd={msgDateEnd}
                />}
            
            </div>

        </div>
    
    </div>
  );
}

export default MainPage;
