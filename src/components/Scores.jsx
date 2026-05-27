export function Scores({ currentScore, bestScore }) {
    return (
        <div id="scores-wrapper">
            <p>Current Score: {currentScore}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    )
}