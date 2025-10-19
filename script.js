const choices = ["stone", "paper", "scissors"];
const icons = { stone: "🗿", paper: "📄", scissors: "✂️" };

let userScore = 0;
let compScore = 0;
let round = 1;
const roundsMax = 5;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function checkWinner(user, comp) {
    if (user === comp) return "draw";
    if ((user === "stone" && comp === "scissors") ||
        (user === "paper" && comp === "stone") ||
        (user === "scissors" && comp === "paper")) return "user";
    return "comp";
}

function updateScores(winner) {
    if (winner === "user") userScore++;
    else if (winner === "comp") compScore++;
    document.getElementById("user-score").textContent = userScore;
    document.getElementById("comp-score").textContent = compScore;
    document.getElementById("round-num").textContent = round;
}

function animateResult(winner, user, comp) {
    const resultDiv = document.getElementById("result");
    if (winner === "draw") {
        resultDiv.style.color = "#ffe576";
        resultDiv.textContent = `Draw! You both chose ${icons[user]}`;
    } else if (winner === "user") {
        resultDiv.style.color = "#32db87";
        resultDiv.textContent = `You Win! ${icons[user]} beats ${icons[comp]}`;
    } else {
        resultDiv.style.color = "#db324e";
        resultDiv.textContent = `You Lose! ${icons[comp]} beats ${icons[user]}`;
    }
    resultDiv.animate([
        { opacity: 0, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1.1)" },
        { opacity: 1, transform: "scale(1)" }
    ], { duration: 390, fill: "forwards" });
}

function handleChoice(e) {
    if (round > roundsMax) return;
    const userChoice = e.target.id;
    const compChoice = getComputerChoice();
    const winner = checkWinner(userChoice, compChoice);
    animateResult(winner, userChoice, compChoice);
    updateScores(winner);
    round++;
    document.getElementById("round-num").textContent = round <= roundsMax ? round : roundsMax;
    if (round > roundsMax) {
        setTimeout(showFinalResult, 900);
    }
}

function showFinalResult() {
    const resultDiv = document.getElementById("result");
    let text, color;
    if (userScore > compScore) {
        text = "🎉 Game Over: You win!";
        color = "#32db87";
    } else if (compScore > userScore) {
        text = "💀 Game Over: Computer wins!";
        color = "#db324e";
    } else {
        text = "😐 Game Over: It's a draw!";
        color = "#ffe576";
    }
    resultDiv.style.color = color;
    resultDiv.textContent = text;
}

document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", handleChoice);
});

document.getElementById("restart").onclick = function () {
    userScore = compScore = 0;
    round = 1;
    document.getElementById("user-score").textContent = 0;
    document.getElementById("comp-score").textContent = 0;
    document.getElementById("round-num").textContent = 1;
    document.getElementById("result").textContent = "";
};
