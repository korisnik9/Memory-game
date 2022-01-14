import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="card-front" src={card.src}  draggable="false" />
        <img
          className="card-back"
          onClick={handleClick}
          src="/img/cover.png"
          draggable="false"
        />
      </div>
    </div>
  );
}
