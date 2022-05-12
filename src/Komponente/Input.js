import { useState } from "react";

function Input (props){
    
    // postavljanje stanja za poruke i definiranje funkcije za slanje poruke iz props-a
    const { sendMessage } = props;
    const [ messageText, setMessageText ] = useState("");

    // funkcija za spremanje vrijednosti polja za unos poruke
    const unosTeksta = e =>{
        setMessageText(e.target.value.toString());
    }

    // funkcija za slanje poruke i postavljanje stanja s vrijednosti poruke na prazno
    const sendMessageSetState = e => {
        e.preventDefault();
        if (messageText.toString().trim() !== "")
            {
                sendMessage(messageText);
                setMessageText("");
            }
        else 
            {
                alert("Unijeli ste praznu poruku odnosno niste ništa upisali. Molimo unesite poruku ili znakove te ponovno pritisnite Enter ili gumb 'POŠALJI'");
            }
    }

    return (
        <form className="form-Input" onSubmit={sendMessageSetState}>
            <input onChange={unosTeksta} value={messageText} autoFocus={true} type="text" maxLength={190} placeholder="Unos i slanje poruke tipkom Enter ili gumbom 'POŠALJI'" />
            <button>POŠALJI</button>
        </form>
        )   
}

export default Input;