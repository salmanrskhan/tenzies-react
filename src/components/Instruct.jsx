import React from 'react'

const Instruct = (props) => {
  return ( 
    props.showInstruct && 
    (
        <div className="instructions-overlay">
            <div className="instructions-content">
                <h2>Instructions</h2>
                <ul>
                    <li>Step 1: Click on a dice to freeze or unfreeze it.</li>
                    <li>Step 2: Click "Roll" to begin.</li>
                    <li>Step 3: Roll the dice to match a winning combination.</li>
                    <li>Step 4: The timer will start when the game begins.</li>
                    <li>Step 5: Win the game by matching all dice to the same number.</li>
                </ul>
                <button className="close-button" onClick={props.handleInstruct}>
                    Close
                </button>
            </div>
        </div>
    )
  )
}

export default Instruct