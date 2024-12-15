import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}){
    const handlerClick = () =>{
        if(!disabled) {
            handleChoice(card)
        }
    }

    return(
        <div className="card-container">
        <div className="card" >
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} alt="card front" className="front"/>
                <img
                    src="/img/cover.png"
                    onClick={handlerClick}
                    alt="card back"
                    className="back"/>
            </div>
        </div>
        </div>
    )
}