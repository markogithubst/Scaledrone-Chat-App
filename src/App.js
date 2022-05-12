import './App.css';
import React, { Component } from 'react';
import { MessageList, Input } from "./Komponente";
// import MessageList i Input from './Komponente/' preko index.js u mapi


// definicija funkcije za postavljanje nasumicnog izbora korisnickog imena, vrijednosti imena
function nameOfTheUser(){
  const adjectives = ["Interesting", "Clumsy", "Little", "Empty", "Oceanic", "Breakable", "Uncovered", "Trite", "Plastic", "Ultra", "Beautiful", "Murky"];
  const nouns = ["Receipt", "Stocking", "Wealth", "Wrench", "Advice", "Pot", "Edge", "Man", "Fang", "Cent", "Milk"];

  return adjectives[Math.floor(Math.random() * adjectives.length)] + " " + nouns[Math.floor(Math.random() * nouns.length)];
}

// definicija funkcije za postavljanje nasumicnog izbora ikone korisnika
function iconOfTheUser() {
  var icons = ["\\user-icons\\1.svg","\\user-icons\\2.svg", "\\user-icons\\3.svg"];
  var icon = icons[Math.floor(Math.random() * 3)];
  return icon;
}

class App extends Component {
  // definicija pocetnog stanja s nizom za nove poruke i informacija o korisniku 
  state = {
    messages: [],
    member: {
      nameOfTheUser: nameOfTheUser(),
      icon: iconOfTheUser() 
    }

  };

  scaledroneConnection(){
    // nova veza sa scaledrone-om, slanje podataka o korisniku
     this.drone = new window.Scaledrone("TRLTuihXBjaPCm3j", {
      data: this.state.member
    });

    // definiranje radnji kod povezivanja sa scaledrone-om
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      // postavljenje lokalne vrijednosti stanja
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member}) ;
    });
    
    // definicija sobe(room) unutar scaledrone kanala
    const room = this.drone.subscribe("observable-room");
    // postavljanje vrijednosti korisnika(member) npr. member.id, imeKorisnika itd u niz poruka (message)
    room.on('data', (data, member) => {
      
      const mcopy = this.state.messages;
      mcopy.push({member, text: data});
      this.setState({mcopy});
    });
  }

  componentDidMount(){
    this.scaledroneConnection();
  }

    render(){

      return (
        <div className="App">
          <header className="App-header"> 
            <h1>Marko Chat APP Scaledrone</h1>
         </header> 
         
          {/* komponente sučelja */}
          <MessageList userMessageList={this.state.member} messagesMessageList={this.state.messages}/>
          <Input sendMessage={this.sendMessage}/>
          </div>
          )}
    
    sendMessage = (message) => { 
      
   
      // publish na scaledrone servis bazu podataka
      this.drone.publish(
        {
          room:"observable-room", 
          message
      }
      )
    };
 
}

export default App;
