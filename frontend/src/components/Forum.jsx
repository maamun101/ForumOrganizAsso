import {useState} from 'react';
import FormMsg from "./FormMsg";
import MsgList from "./MsgList";

function Forum({isPrivate, setDisplayProfile, setUserProfile, msgSearchContent, dateBegin, dateEnd}){

    // state modifier pour actualiser la liste
    const [updateList, setUpdateList] = useState(0);

    return (
    <div className='Forum'>
        <FormMsg 
            isComment={false} 
            msgAnswered={-1} 
            isPrivate={isPrivate}
            setUpdateList={(val) => setUpdateList(val)}
            updateList={updateList}
        />
        <MsgList
            isPrivate={isPrivate}
            msgSearchContent={msgSearchContent}
            dateBegin={dateBegin}
            dateEnd={dateEnd}
            setDisplayProfile={(bool) => {setDisplayProfile(bool)}}
            setUserProfile={(userId) => {setUserProfile(userId)}}
            setUpdateList={(val) => setUpdateList(val)}
            updateList={updateList}
        />
    </div>);

}

export default Forum;