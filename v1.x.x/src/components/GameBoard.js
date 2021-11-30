import {useState, useEffect} from 'react';

const GameBoard = () => {
	const [currentCandyPattern, setCurrentCandyPattern] = useState([]),
		  width                                         = 8,
		  candyColors                                   = [
															  'blue',
															  'red',
															  'purple',
															  'orange',
															  'yellow',
															  'green',
														  ];
	
	// Check for a column of four matching candies
	const matchColFour = () => {
		for (let i = 0; i < 39; i++) {
			const colFour     = [i, i + width, i + width * 2, i + width * 3],
				  candyChoice = currentCandyPattern[i];

			if (colFour.every(candy => currentCandyPattern[candy] === candyChoice)) {
				colFour.forEach(candy => currentCandyPattern[candy] = '');
			}
		}
	}

	// Check for a row of four matching candies
	const matchRowFour = () => {
		for (let i = 0; i < 64; i++) {
			const rowFour     = [i, i + 1, i + 2, i + 3],
				  candyChoice = currentCandyPattern[i],
				  endOfRow    = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

			if (endOfRow.includes(i)) continue;
			if (rowFour.every(candy => currentCandyPattern[candy] === candyChoice)) {
				rowFour.forEach(candy => currentCandyPattern[candy] = '');
			}
		}
	}

	// Check for a column of three matching candies
	const matchColThree = () => {
		for (let i = 0; i < 47; i++) {
			const colThree    = [i, i + width, i + width * 2],
				  candyChoice = currentCandyPattern[i];

			if (colThree.every(candy => currentCandyPattern[candy] === candyChoice)) {
				colThree.forEach(candy => currentCandyPattern[candy] = '');
			}
		}
	}

	// Check for a row of three matching candies
	const matchRowThree = () => {
		for (let i = 0; i < 64; i++) {
			const rowThree    = [i, i + 1, i + 2],
				  candyChoice = currentCandyPattern[i],
				  endOfRow    = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

			if (endOfRow.includes(i)) continue;
			if (rowThree.every(candy => currentCandyPattern[candy] === candyChoice)) {
				rowThree.forEach(candy => currentCandyPattern[candy] = '');
			}
		}
	}

	// Shift candies downward and replenish the game board
	const shiftDown = () => {
		for (let i = 0; i < 64 - width; i++) {
			const topRow   = [0, 1, 2, 3, 4, 5, 6, 7],
				  isTopRow = topRow.includes(i);

			if (isTopRow && currentCandyPattern[i] === '') {
				let newCandy = Math.floor(Math.random() * candyColors.length);

				currentCandyPattern[i] = candyColors[newCandy];
			}
			if ((currentCandyPattern[i + width]) === '') {
				currentCandyPattern[i + width] = currentCandyPattern[i];
				currentCandyPattern[i] = '';
			}
		}
	}

	// Populate a randomized game board
	const createBoard = () => {
		const candyPattern = [];

		for (let i = 0; i < width * width; i++) {
			const randomNumber = Math.floor(Math.random() * candyColors.length),
				  randomCandy  = candyColors[randomNumber];

			candyPattern.push(randomCandy);
		}
		setCurrentCandyPattern(candyPattern);
	}
	
	// Render the game board
	useEffect(() => {
		createBoard();
	}, []);

	/* Eliminate columns of three and four matching candies &
	   also eliminate rows of three and four matching candies */
	useEffect(() => {
		const timer = setInterval(() => {
			matchColFour();
			matchRowFour();
			matchColThree();
			matchRowThree();
			shiftDown();
			setCurrentCandyPattern([...currentCandyPattern]);
		}, 100);

		return () => clearInterval(timer);
	}, [matchColFour, matchRowFour, matchColThree, matchRowThree, shiftDown, currentCandyPattern]);

	return (
		<div className='container'>
			<div className='gameBoard'>
				{currentCandyPattern.map((candyColor, index) => (
					<img 
						key={index}
						style={{backgroundColor: candyColor}}
						alt={candyColor}
					/>
				))}
			</div>
		</div>
	);
}

export default GameBoard;