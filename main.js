function Player(name, sym, color)
{
	return {name, sym, color};
}

let gameBoard = (function (){
	let matrix = [];
	let players = [];
	let currentPlayer = 0;
	wonFlag = false;
	drawFlag = false;
	gridCells = document.querySelectorAll(".grid-cell");

	let getNamesAndSetup = function()
	{
		let p1Name = document.getElementById("p1-input").value;
		let p2Name = document.getElementById("p2-input").value;
		console.log(p1Name);
		console.log(p2Name);
		let p1 = Player(p1Name, "X", "blue");
		let p2 = Player(p2Name, "O", "red");
		players = [];
		players.push(p1);
		players.push(p2);
		let nameDiv = document.querySelector(".name-contents");
		nameDiv.style.display = "none";
		let gameDiv = document.querySelector(".game-contents");
		gameDiv.style.display = "block";
		setupBoard();
	}

	let setupBoard = function(){
		console.log("In setupBoard...");
		matrix = [];
		for(let i = 0; i < 3; i++)
		{
			matrix.push(["", "", ""]);
		}
		currentPlayer = 0;
		wonFlag = false;
		drawFlag = false;
		// add event listeners
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
		if(!wonFlag && !drawFlag)
		{
			dsp.textContent = `${pName}'s turn! (${pSym})`;
		}
		else if(wonFlag && !drawFlag)
		{
			dsp.textContent = `${pName} wins!`;
		}
		else
		{
			dsp.textContent = "It's a draw!";
		}
	}

	let isDraw = function()
	{
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				if(matrix[i][j] == "")
				{
					return false;
				}
			}
		}
		return true;
	}

	let hasWonHorz = function(x)
	{
		let sym = matrix[x][0];
		for(let i = 0; i < 3; i++)
		{
			if(matrix[x][i] != sym || sym == "")
			{
				return false;
			}
		}
		return true;
	}

	let hasWonVert = function(y)
	{
		sym = matrix[0][y];
		for(let i = 0; i < 3; i++)
		{
			if(matrix[i][y] != sym || sym == "")
			{
				return false;
			}
		}
		return true;
	}

	let hasWonDiag = function(x, y)
	{
		if((y == 1 && (x == 0 || x == 2)) || (x == 1 && (y == 0 || y == 2)) || matrix[x][y] == "")
		{
			return false;
		}
		else
		{
			let diag1 = [matrix[0][0], matrix[1][1], matrix[2][2]];
			let diag2 = [matrix[0][2], matrix[1][1], matrix[2][0]];
			diag1Set = new Set(diag1);
			diag2Set = new Set(diag2);
			if(diag1Set.has("") && diag2Set.has(""))
			{
				return false;
			}
			return diag1Set.size == 1 || diag2Set.size == 1;
		}
	}

	let lockBoard = function()
	{
		gridCells.forEach(cell => {
			cell.disabled = true;
		});
	}

	let winCheck = function(x, y)
	{
		console.log(hasWonHorz(x) + " " + hasWonVert(y) + " " + hasWonDiag(x,y));
		console.log(matrix);
		let won = hasWonHorz(x) || hasWonVert(y) || hasWonDiag(x, y);
		if(won)
		{
			lockBoard();
			wonFlag = true;
			updateDsp();
		}
		else if(isDraw())
		{
			wonFlag = false;
			drawFlag = true;
			updateDsp();
		}
	}

	let makeMove = function()
	{
		// is event listener for the buttons
		// on click, checks current player, draws symbol, disables
		console.log("In makeMove...");
		let sym = players[currentPlayer].sym;
		this.style.color = players[currentPlayer].color;
		this.textContent = sym;
		let x = Number(this.value.substring(0,1));
		let y = Number(this.value.substring(1));
		matrix[x][y] = sym;
		this.disabled = true;
		winCheck(x, y);
		if(!wonFlag)
		{
			currentPlayer = (currentPlayer + 1) % 2;
			updateDsp();
		}
	}
	return {setupBoard: setupBoard, getNamesAndSetup: getNamesAndSetup};
})();

let ngButton = document.getElementById("rst");
let nameButton = document.getElementById("name-btn");
ngButton.onclick = gameBoard.setupBoard;
nameButton.onclick = gameBoard.getNamesAndSetup;