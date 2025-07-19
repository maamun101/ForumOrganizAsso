import { useState } from "react";

function SearchMsg({setMsgDateBegin, setMsgDateEnd, setMsgContent}){

    // States contenant les valeurs des champs du formulaire
    const [content, setContent] = useState();
    const [dateBegin, setDateBegin] = useState();
    const [dateEnd, setDateEnd] = useState();


    // fonction executé une fois le bouton rechercher appuyer, actualise les filtre
    const handleSetFilter = (event) => {
        event.preventDefault();
        setMsgContent(content);
        setMsgDateBegin(dateBegin);
        setMsgDateEnd(dateEnd);
    }

    return (
    <div className="searchZone">
        <form className="searchBar" onSubmit={handleSetFilter}>
            <input id='content' className="searchInput" type='text' placeholder="Rechercher..." onChange={(e) => {setContent(e.target.value)}}/>
            <input type="date" id='dateBegin' title="Date plus ancienne" onChange={(e) => {setDateBegin(e.target.value)}}/>
            <input type="date" id='dateEnd' title="Date plus récente" onChange={(e) => {setDateEnd(e.target.value)}}/>
            <button type="submit">🔍</button>
        </form>
    </div>
    )

}

export default SearchMsg;