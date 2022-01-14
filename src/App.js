import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import Message from "./Message";

const genNums = () => {
  const nums = [1,2,3,4,5,6];
  while (nums.length < 6) {
    const num = Math.floor(Math.random() * 10) + 1;
    if (!nums.includes(num)) {
      nums.push(num);
    }
  }
  return nums;
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [points, setPoints] = useState(0);
  const [card1, setFirst] = useState(null);
  const [card2, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  const shuffle = () => {
    // kreira objekat sa fajlom putanje 
    const cardImages = genNums().map((num) => ({ src: `/img/album/${num}.jpg`, matched: false }));
    console.log(cardImages )
    const shuffledCards = [...cardImages, ...cardImages] // dupli niz kreira par 
      .sort(() => 0.5 - Math.random()) // random sortiranje
      .map((card, i) => ({ ...card, id: i })); // dodijeljivanje id-a

    setFirst(null);
    setSecond(null);
    setCards(shuffledCards);
    setTurns(5);
    setPoints(0);
  };

  const handleChoice = (card) => {
    card1 && card1.id !== card.id ? setSecond(card) : setFirst(card);
  };


  useEffect(() => {
    if (card1 && card2) {
      setDisabled(true);
      if (card1.src === card2.src) {
         setTurns(turns+1) 
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === card1.src) {
              setPoints(points + 1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 550);
      }
    }
  }, [card1, card2]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setTurns((prevTurns) => prevTurns - 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffle();
  }, []);

  let message = "";
  if(turns === 0) {
    message= <Message score={points} click={shuffle} />
  }

  return (
    
    <div className="App">
      <h1>Card Memory</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === card1 || card === card2 || card.matched}
            disabled={disabled}
          />
        
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p>Points: {points}</p>
      {message}
    </div>
    
  );
}

export default App;


