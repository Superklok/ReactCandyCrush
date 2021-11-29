import PropTypes from 'prop-types';

const Header = ({title}) => {
	return (
		<header className='rccText'>
			<h1>{title}</h1>
		</header>
	);
}

Header.defaultProps = {
	title: 'React Candy Crush',
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
}

export default Header;