import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';

import {preguntasObj, respuestasObj} from "./import"

const App = () => {
  /* seteamos dos estados, uno para preguntas y otro para respuestas */
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [primerIntento, setPrimerIntento] = useState({});
  const [segundoIntento, setSegundoIntento] = useState({});

  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);


  /* Array para randomizar */
  const shuffleArray = (array) =>{                             
    for(let i = array.length - 1 ; i > 0 ; i--) {
      let j = Math.floor(Math.random() * (i+1) );
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
/* cuando montamos el componente , mezclamos las preguntas y las respuestas que nos trajimos del import,
luego las seteamos en los estados correspondientes*/
  useEffect(()=>{
    shuffleArray(preguntasObj);
    shuffleArray(respuestasObj);
    setPreguntas(preguntasObj);
    setRespuestas(respuestasObj)
  },[])

  useEffect(()=>{
    checkForMatch();
  },[segundoIntento])

  const flipCard = (name, key) => {
    if (primerIntento.name === name && primerIntento.key === key) {
      return 0;
    }
    if (!primerIntento.name) {
      setPrimerIntento({name, key});
    }
    else if(!segundoIntento.name){
      setSegundoIntento({name, key})
    }
    return 1;
  }

  const checkForMatch = () => {
    if(primerIntento.key && segundoIntento.key) {
      const match = primerIntento.key === segundoIntento.key;
      match ? disableCards() : unflipCards();
    }
  }

  const disableCards = () => {
    setDisabledCards([primerIntento.key , segundoIntento.key]);
    resetCards();
  }
  const unflipCards = () => {
    setUnflippedCards([primerIntento.key, segundoIntento.key]);
    resetCards();
  }

  const resetCards = () => {
    setPrimerIntento({});
    setSegundoIntento({});
  }

 
  return (

    <div className='app'>
    <header>
    <h1>Memorama EMPRESA</h1>
    </header>
    <div className='chronometer'>
          <button>START</button>
          <h2>03:59</h2>
    </div>
    <div className='container-preguntas-respuestas'>
    
    <div className='cards-container-pregunta'>
        <h1>Preguntas</h1>
        {
          preguntas.map((card)=> (
            <Card 
            name = {card.name} 
            clave={card.key} 
            flipCard={flipCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
            />
          ))
        }
      </div>
      <div className='cards-container-respuesta'>
        <h1>Respuestas</h1>
        {
          respuestas.map((card)=>(
            <Card 
            name = {card.name} 
            clave={card.key}
            flipCard={flipCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
            />
          ))
        }
      </div>
    </div>
      <footer className='footer'>
        <h1>Nombre y logo de la empresa</h1>
      </footer>
    </div>
  )
}


  export default App;
