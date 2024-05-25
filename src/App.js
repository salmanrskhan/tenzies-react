import './App.css';
import Die from './components/Die';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

// Added for more features
import Instruct from './components/Instruct';
import { FaPlay } from "react-icons/fa6";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [showInstruct, setShowInstruct] = useState(false)
  const [time, setTime] = useState(0);
  const [timeRun, setTimeRun] = useState(false);
  const [rolls, setRolls] = useState(0)


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setTimeRun(false);
    }
  }, [dice])

  useEffect(() => {
    if (timeRun && time < 300) {
      const timerInterval = setInterval(() => {
        if (timeRun) {
          setTime(time + 1);
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timeRun, time]);


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
      setTimeRun(true);
      setRolls(rolls + 1);
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
      setTimeRun(true);
      setTime(0)
      setRolls(0);
    }

  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function resetGame() {
    setTenzies(false)
    setTimeRun(false);
    setTime(0)
    setRolls(0);
    setDice(allNewDice())
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <div
        className="instructions-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <button
          onClick={() => setShowInstruct(true)}>
          <FaPlay className="icon-margin" />
          Show Instructions
        </button>
      </div>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <p className="para">
        <PiArrowsCounterClockwiseBold className="icon-margin" />
        Rolls: {rolls}
      </p>
      <p className="para">
      <FaRegClock className="icon-margin" />

        Time: {time} sec
      </p>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      {rolls ? <button className="roll-dice reset-dice" onClick={resetGame}>Reset</button> : null}


      <Instruct showInstruct={showInstruct} handleInstruct={() => setShowInstruct(false)} />
    </main>
  )
}

export default App;
