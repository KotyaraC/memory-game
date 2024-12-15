import React from "react";
import "./Leaderboard.css";

export default function Leaderboard({ data }) {
    return (
        <div className="leaderboard-container">
            <h2>Таблиця лідерів</h2>
            <div className="leaderboard">
                {data
                    .sort((a, b) => a.time - b.time || a.turns - b.turns)
                    .map((entry, index) => (
                        <div key={index} className={`leaderboard-card ${index === 0 ? "first-place" : ""}`}>
                            <div className="position">{index + 1}</div>
                            <div className="details">
                                <h3>{entry.username}</h3>
                                <p>Час: <span>{entry.time} сек</span></p>
                                <p>Ходи: <span>{entry.turns}</span></p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
