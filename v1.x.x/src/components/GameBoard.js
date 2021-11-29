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

	// Eliminate a column of three matching candies	
	useEffect(() => {
		const timer = setInterval(() => {
			matchColThree();
			setCurrentCandyPattern([...currentCandyPattern]);
		}, 100);

		return () => clearInterval(timer);
	}, [matchColThree, currentCandyPattern]);

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