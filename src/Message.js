import React from 'react';
import './Message.css';

const Message = (e) => {
    return <div className="WinMessage">
        <p className="message">You lose! Try again</p>
        <p className="message">Final Score: {e.score} </p>
        <button className="b" onClick={e.click}>Play Again</button>
    </div>
}

export default Message;