import React, { Component } from "react";

class MessageList extends Component{

    // pohrana funkcije za izradu reference do koje će se focus pomaknuti na zadnji element u listi poruka
    static messagesEnd = React.createRef()

    //  definicija funkcije za pomak fokusa/scroll do određenog elementa 
    functionBottomScroll = () => {
        if (this.messagesEnd !== ""  && this.messagesEnd !== undefined){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }      	
      }
      
      //  scroll do zadnjeg elementa nakon mounta ove komponente(lista poruka)
      componentDidMount() {
        this.functionBottomScroll();
      }
      //   scroll nakon azuriranja tj. primanja/slanja nove poruke
      componentDidUpdate() {
        this.functionBottomScroll();
      }

    render(){ 
        
        // definiranje vrijednosti stanja poruke, korisnika iz props-a
        const { messagesMessageList, userMessageList } = this.props;

        return(
            <ul className="messagesContainer">
                {/* iteracija preko objekata u nizu poruke */}
                {
                    messagesMessageList.map((poruka, index) => {
                        const {member, text} = poruka;
                        //Dohvaćanje vrijednosti member objekta i teksta poruke unutar objekta koji servis vraca 
                        if (member.clientData.nameOfTheUser === userMessageList.nameOfTheUser){
                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={Math.random().toString(36).substr(2, 5)}  className="alignMessageToTheRight message">
                                   
                                    <div className="content" >
                                        <h4>{member.clientData.nameOfTheUser}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <span className="iconStyle">
                                        <img src={member.clientData.icon} alt="user-icon"/>
                                    </span>
                                     <div ref={(el) => { this.messagesEnd = el; }}></div>
                                     {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
                                </li>
                                
                            )
                        }
                        
                        else {
                           
                            //  vracanje elementa liste s vrijednosti poruke
                            return (
                                <li key={Math.random().toString(36).substr(2, 5)} className="alignMessageToTheLeft message" >
                                  <span className="iconStyle">
                                        <img src={member.clientData.icon} alt="user-icon" />
                                    </span>
                                    <div className="content">
                                        <h4>{member.clientData.nameOfTheUser}</h4>
                                        <p>{text}</p>
                                    </div>
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                                    {/* prazni spremnik do kojega se scroll pomice nakon primanja/slanja poruke */}
                                </li>
                            )
                        }
                      
                    })
                }
            </ul>
        )
    }
}

export default MessageList;