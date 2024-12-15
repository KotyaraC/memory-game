import './App.css';
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";
import Login from "./components/Login";
import Leaderboard from "./components/Leaderboard";

const cardImages = [
  {"src": "/img/html.png", matched: false},
  {"src": "/img/css.png", matched: false},
  {"src": "/img/js.png", matched: false},
  {"src": "/img/node.png", matched: false},
  {"src": "/img/Angular.png", matched: false},
  {"src": "/img/React.png", matched: false}
]

function App() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const matchSound = new Audio('/sounds/match.mp3');
    const mismatchSound = new Audio('/sounds/mismatch.mp3');
    const [time, setTime] = useState(0); // Стан для таймера
    const [user, setUser] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [leaderboard, setLeaderboard] = useState([
        {username: "admin", time: 30, turns: 10},
        {username: "player1", time: 45, turns: 15},
    ]);
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [gridSize, setGridSize] = useState(4);
    const [theme, setTheme] = useState("light");


    const shuffleCards = () => {
        const totalCards = gridSize * gridSize / 2;
        const selectedCards = cardImages.slice(0, totalCards);
        const shuffledCards = [...selectedCards, ...selectedCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))

        setCards(shuffledCards)
        setTurns(0)
        setTime(0)
        setGameStarted(true);
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                matchSound.play();
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true};
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => {
                    mismatchSound.play();
                    resetTurn();
                }, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        let timer;
        if (cards.length > 0 && !cards.every(card => card.matched)) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cards]);
    const handleLogin = (user) => {
        setUser(user); // Зберігаємо користувача після входу
    };
    useEffect(() => {
        if (gameStarted && cards.length > 0 && cards.every(card => card.matched)) {
            setLeaderboard(prev => [
                ...prev,
                {username: user.username, time, turns},
            ]);
            setGameStarted(false); // Завершити гру
        }
    }, [cards, gameStarted, user, time, turns]);

    const showLeaderboardHandler = () => {
        setShowLeaderboard(true); // Показати таблицю лідерів
    };

    const hideLeaderboardHandler = () => {
        setShowLeaderboard(false); // Повернутися до меню
    };
    const handleGridSizeChange = (size) => {
        setGridSize(size); // Оновлюємо розмір поля
        shuffleCards(); // Запускаємо гру з новим розміром
    };
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (

        <div className={`App ${theme}`}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
            {!user ? (
                <Login onLogin={handleLogin}/>
            ) : (
                <>
                    <h1>Memory Game</h1>
                    {!gameStarted && !showLeaderboard ? (
                        <div className="menu">
                            <button onClick={showLeaderboardHandler}>Таблиця лідерів</button>
                            <div>
                                <h3>Виберіть розмір поля:</h3>
                                <button onClick={() => handleGridSizeChange(2)}>2 x 2</button>
                                <button onClick={() => handleGridSizeChange(3)}>3 x 3</button>
                                <button onClick={() => handleGridSizeChange(4)}>4 x 4</button>
                            </div>
                            <button onClick={toggleTheme}>🎨 Змінити тему</button>
                        </div>
                    ) : showLeaderboard ? (
                        <div className="leaderboard-container">
                            <Leaderboard data={leaderboard}/>
                            <button onClick={hideLeaderboardHandler}>Назад</button>
                        </div>
                    ) : (
                        <>
                            <div className="game-info">
                                <div>
                                    <i className="fas fa-hourglass-half"></i>
                                    <span>Час: {time}s</span>
                                </div>
                                <div>
                                    <i className="fas fa-redo-alt"></i>
                                    <span>Перевороти: {turns}</span>
                                </div>
                            </div>
                            <div
                                className="card-grid"
                                style={{
                                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                }}
                            >
                                {cards.map(card => (
                                    <SingleCard
                                        key={card.id}
                                        card={card}
                                        handleChoice={handleChoice}
                                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                                        disabled={disabled}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
