export function Scores({ currentScore, bestScore }) {
    return (
        <div id="scores-wrapper">
            <div id="current-score-wrapper" className="scores">
                <p className="score-label label">Current Score</p>
                <p className="score-value">{currentScore}</p>
            </div>
            <div id="best-score-wrapper" className="scores">
                <p className="score-label label">Best Score</p>
                <p className="score-value">{bestScore}</p>
            </div>
        </div>
    )
}