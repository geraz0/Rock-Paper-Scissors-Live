const hands = ['rock', 'paper', 'scissors'];

function getHand() {
    return hands[Math.floor(Math.random() * 3)];
}

const players = [
    { name: "Player 1", getHand, wins: 0 },
    { name: "Player 2", getHand, wins: 0 }
];

function updatePlayerDisplay(player) {
    const playerElement = document.getElementById(player.name.toLowerCase().replace(' ', ''));
    playerElement.querySelector('.hand').textContent = player.hand || '';
    playerElement.querySelector('.score').textContent = player.wins;
}

function playRound(player1, player2) {
    player1.hand = player1.getHand();
    player2.hand = player2.getHand();

    updatePlayerDisplay(player1);
    updatePlayerDisplay(player2);

    if (player1.hand === player2.hand) {
        console.log("It's a tie!");
        return null;
    }

    let winner;
    if (
        (player1.hand === 'rock' && player2.hand === 'scissors') ||
        (player1.hand === 'paper' && player2.hand === 'rock') ||
        (player1.hand === 'scissors' && player2.hand === 'paper')
    ) {
        winner = player1;
    } else {
        winner = player2;
    }

    winner.wins++;
    updatePlayerDisplay(winner);
    console.log(`The winner is ${winner.name}`);
    return winner;
}

function playGame(player1, player2, playUntil) {
    player1.wins = 0;
    player2.wins = 0;
    updatePlayerDisplay(player1);
    updatePlayerDisplay(player2);

    while (player1.wins < playUntil && player2.wins < playUntil) {
        playRound(player1, player2);
    }

    const winner = player1.wins === playUntil ? player1 : player2;
    console.log(`${winner.name} wins the game!`);
    return winner;
}

document.getElementById('start-tournament').addEventListener('click', () => {
    const finalWinner = playGame(players[0], players[1], 3);
    document.getElementById('champion').textContent = `${finalWinner.name} is the world champion!`;
});
