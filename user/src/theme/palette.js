// const PRIMARY = {
//     lighter: '#FFF9AE',
//     light: '#F8ED62',
//     main: '#E9D700',
//     dark: '#DAB600',
//     darker: '#A98600',
//     contrastText: '#fff'
// };

const SECONDARY = {
	lighter: '#FFA48D',
	light: '#FF867B',
	main: '#F53D2D',
	dark: '#D35449',
	darker: '#B72136',
	contrastText: '#FFF',
};

const ERROR = {
	lighter: '#FFA48D',
	light: '#FF867B',
	main: '#F53D2D',
	dark: '#D35449',
	darker: '#B72136',
	contrastText: '#FFF',
};

const SUCCESS = {
	lighter: '#C8FACD',
	light: '#5BE584',
	main: '#00AB55',
	dark: '#007B55',
	darker: '#005249',
	contrastText: '#FFF',
};

const WARNING = {
	lighter: '#FFF1B1',
	light: '#FFE678',
	main: '#FDD836',
	dark: '#F6CF24',
	darker: '#DEB70D',
	contrastText: '#FFF',
};

const COMMON = {
	// primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	error: { ...ERROR },
	success: { ...SUCCESS },
	warning: { ...WARNING },
};

const palette = {
	...COMMON,
	background: { paper: '#FFF', default: '#FFF' }
};

export default palette;
