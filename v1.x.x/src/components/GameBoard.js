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