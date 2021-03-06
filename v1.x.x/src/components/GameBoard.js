import {useState, useEffect} from 'react';
import ScoreBoard from './ScoreBoard';
import blueCandy from '../assets/img/candy/blueCandy.png';
import redCandy from '../assets/img/candy/redCandy.png';
import purpleCandy from '../assets/img/candy/purpleCandy.png';
import orangeCandy from '../assets/img/candy/orangeCandy.png';
import yellowCandy from '../assets/img/candy/yellowCandy.png';
import greenCandy from '../assets/img/candy/greenCandy.png';
import noCandy from '../assets/img/candy/noCandy.png';

const GameBoard = () => {
	const [currentCandyPattern, setCurrentCandyPattern]   = useState([]),
		  [currentDraggedCandy, setCurrentDraggedCandy]   = useState(null),
		  [currentReplacedCandy, setCurrentReplacedCandy] = useState(null),
		  [currentScore, setCurrentScore]                 = useState(0),
		  width                                           = 8,
		  candyColors                                     = [
																blueCandy,
																redCandy,
																purpleCandy,
																orangeCandy,
																yellowCandy,
																greenCandy,
															];
	
	// Check for a column of four matching candies
	const matchColFour = () => {
		for (let i = 0; i <= 39; i++) {
			const colFour     = [i, i + width, i + width * 2, i + width * 3],
				  candyChoice = currentCandyPattern[i],
				  isNoCandy   = currentCandyPattern[i] === noCandy;

			if (colFour.every(candy => currentCandyPattern[candy] === candyChoice && !isNoCandy)) {
				setCurrentScore((score) => score + 4);
				colFour.forEach(candy => currentCandyPattern[candy] = noCandy);
				return true;
			}
		}
	}

	// Check for a row of four matching candies
	const matchRowFour = () => {
		for (let i = 0; i < 64; i++) {
			const rowFour     = [i, i + 1, i + 2, i + 3],
				  candyChoice = currentCandyPattern[i],
				  endOfRow    = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64],
				  isNoCandy   = currentCandyPattern[i] === noCandy;

			if (endOfRow.includes(i)) continue;
			if (rowFour.every(candy => currentCandyPattern[candy] === candyChoice && !isNoCandy)) {
				setCurrentScore((score) => score + 4);
				rowFour.forEach(candy => currentCandyPattern[candy] = noCandy);
				return true;
			}
		}
	}

	// Check for a column of three matching candies
	const matchColThree = () => {
		for (let i = 0; i <= 47; i++) {
			const colThree    = [i, i + width, i + width * 2],
				  candyChoice = currentCandyPattern[i],
				  isNoCandy   = currentCandyPattern[i] === noCandy;

			if (colThree.every(candy => currentCandyPattern[candy] === candyChoice && !isNoCandy)) {
				setCurrentScore((score) => score + 3);
				colThree.forEach(candy => currentCandyPattern[candy] = noCandy);
				return true;
			}
		}
	}

	// Check for a row of three matching candies
	const matchRowThree = () => {
		for (let i = 0; i < 64; i++) {
			const rowThree    = [i, i + 1, i + 2],
				  candyChoice = currentCandyPattern[i],
				  endOfRow    = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64],
				  isNoCandy   = currentCandyPattern[i] === noCandy;

			if (endOfRow.includes(i)) continue;
			if (rowThree.every(candy => currentCandyPattern[candy] === candyChoice && !isNoCandy)) {
				setCurrentScore((score) => score + 3);
				rowThree.forEach(candy => currentCandyPattern[candy] = noCandy);
				return true;
			}
		}
	}

	// Shift candies downward and replenish the game board
	const shiftDown = () => {
		for (let i = 0; i <= 55; i++) {
			const topRow   = [0, 1, 2, 3, 4, 5, 6, 7],
				  isTopRow = topRow.includes(i);

			if (isTopRow && currentCandyPattern[i] === noCandy) {
				let newCandy = Math.floor(Math.random() * candyColors.length);

				currentCandyPattern[i] = candyColors[newCandy];
			}
			if ((currentCandyPattern[i + width]) === noCandy) {
				currentCandyPattern[i + width] = currentCandyPattern[i];
				currentCandyPattern[i] = noCandy;
			}
		}
	}

	// Game control to drag candy
	const dragStart = (e) => {
		setCurrentDraggedCandy(e.target);
	}

	// Game control to drop candy
	const dragDrop = (e) => {
		setCurrentReplacedCandy(e.target);
	}

	// Game control to replace candy
	const dragEnd = () => {
		const currentDraggedCandyId  = parseInt(currentDraggedCandy.getAttribute('data-id')),
			  currentReplacedCandyId = parseInt(currentReplacedCandy.getAttribute('data-id'));

		currentCandyPattern[currentReplacedCandyId] = currentDraggedCandy.getAttribute('src');
		currentCandyPattern[currentDraggedCandyId] = currentReplacedCandy.getAttribute('src');
		
		const validMoves   = [
								 currentDraggedCandyId - 1,
								 currentDraggedCandyId - width,
								 currentDraggedCandyId + 1,
								 currentDraggedCandyId + width,
							 ],
			  validMove    = validMoves.includes(currentReplacedCandyId),
			  isColFour    = matchColFour(),
			  isRowFour    = matchRowFour(),
			  isColThree   = matchColThree(),
			  isRowThree   = matchRowThree();

		if (currentReplacedCandyId && 
			validMove && 
			(isColFour || isRowFour || isColThree || isRowThree)) {
				setCurrentDraggedCandy(null);
				setCurrentReplacedCandy(null);
			} else {
				currentCandyPattern[currentReplacedCandyId] = currentReplacedCandy.getAttribute('src');
				currentCandyPattern[currentDraggedCandyId] = currentDraggedCandy.getAttribute('src');
				setCurrentCandyPattern([...currentCandyPattern]);
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
						src={candyColor}
						alt={candyColor}
						data-id={index}
						draggable={true}
						onDragStart={dragStart}
						onDragOver={(e) => e.preventDefault()}
						onDragEnter={(e) => e.preventDefault()}
						onDragLeave={(e) => e.preventDefault()}
						onDrop={dragDrop}
						onDragEnd={dragEnd}
					/>
				))}
				<div className='scoreBoard'>
					<ScoreBoard score={currentScore} />
				</div>
			</div>
		</div>
	);
}

export default GameBoard;