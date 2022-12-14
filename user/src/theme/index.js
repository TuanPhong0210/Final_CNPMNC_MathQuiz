import PropTypes from 'prop-types';
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	GlobalStyles as MuiGlobalStyles,
} from '@mui/material';


//
import GlobalStyles from './globalStyles';
import palette from './palette'

const propTypes = {
	children: PropTypes.node,
};

const ThemeConfig = ({ children }) => {
	const themeOptions = {
		palette,
		typography: {
			fontFamily: 'Quicksand',
		},
	};
	const theme = createTheme(themeOptions);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<MuiGlobalStyles styles={GlobalStyles(theme)} />
			{children}
		</ThemeProvider>
	);
};

ThemeConfig.propTypes = propTypes;

export default ThemeConfig;