document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset-btn");
    const newGameBtn = document.querySelector("#new-btn");
    const msgContainer = document.querySelector(".msg-container");
    const msg = document.querySelector("#msg");
    const turnDisplay = document.querySelector("#turn-display");
    const container = document.querySelector(".container");
    const gameNameContainer = document.querySelector(".game-name-container");

    let turn = 'X';
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const resetGame = () => {
        turn = 'X';
        gameActive = true;
        updateTurnDisplay();
        enableBoxes();
        msgContainer.classList.add("hide");
        container.classList.remove("hide");
        newGameBtn.classList.add("hide");
        resetBtn.classList.remove("hide");
        if (gameNameContainer) {
            gameNameContainer.classList.remove("hide");
        }
    };

    const startNewGame = () => {
        resetGame();
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove('winner');
        });
    };

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, ${winner} wins!`;
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        disableBoxes();
        if (gameNameContainer) {
            gameNameContainer.classList.add("hide");
        }
        newGameBtn.classList.remove("hide");
        resetBtn.classList.add("hide");
    };

    const showDraw = () => {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        disableBoxes();
        if (gameNameContainer) {
            gameNameContainer.classList.add("hide");
        }
        newGameBtn.classList.remove("hide");
        resetBtn.classList.add("hide");
    };

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern.map(index => boxes[index].innerText);
            if (a && a === b && b === c) {
                boxes[pattern[0]].classList.add('winner');
                boxes[pattern[1]].classList.add('winner');
                boxes[pattern[2]].classList.add('winner');
                showWinner(a);
                return;
            }
        }
        if ([...boxes].every(box => box.innerText)) {
            showDraw();
        }
    };

    const updateTurnDisplay = () => {
        turnDisplay.innerText = `Current Turn: ${turn}`;
    };

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (gameActive && !box.innerText) {
                box.innerText = turn;
                box.disabled = true;
                checkWinner();
                turn = turn === 'X' ? 'O' : 'X';
                updateTurnDisplay();
            }
        });
    });

    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', startNewGame);

    newGameBtn.classList.add("hide");
    resetBtn.classList.remove("hide");
    updateTurnDisplay();
});
