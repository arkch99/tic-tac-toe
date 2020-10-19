function Player(name, sym)
{
	return {name, sym};
}

let gameBoard = (function (){
	let matrix = [];
	let players = [];
	let currentPlayer = 0;
	let setupBoard = function(){
		console.log("In setupBoard...");
		for(let i = 0; i < 3; i++)
		{
			matrix.push(["", "", ""]);
		}
		let p1 = Player("Player 1", "X");
		let p2 = Player("Player 2", "O");
		//console.log({p1, p2});
		players.push(p1);
		players.push(p2);
		currentPlayer = 0;
		// add event listeners
		gridCells = document.querySelectorAll(".grid-cell");
		gridCells.forEach(cell => {
			cell.addEventListener("click", makeMove);
			cell.textContent = "";
			cell.disabled = false;
		});
		updateDsp();
	}

	let updateDsp = function()
	{
		let dsp = document.getElementById("turn-dsp");
		let player = players[currentPlayer];
		let pName = player.name;
		let pSym = player.sym;
		dsp.textContent = `${pName}'s turn! (${pSym})`;
	}

	// TODO: add win-checking function
	let makeMove = function()
	{
		// is event listener for the buttons
		// on click, checks current player, draws symbol, disables
		console.log("makeMove called");
		let sym = players[currentPlayer].sym;
		this.textContent = sym;
		let x = Number(this.value.substring(0,1));
		let y = Number(this.value.substring(1));
		matrix[x][y] = sym;
		currentPlayer = (currentPlayer + 1) % 2;
		this.disabled = true;
		updateDsp();
	}

	return {setupBoard: setupBoard};
})();

let ngButton = document.getElementById("rst");
ngButton.onclick = gameBoard.setupBoard;