import React from 'react';
import { CssBaseline, PaletteType } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import * as ThemeProcessor from 'themes/themePicker';

interface ThemingProps {
	children: React.ReactElement;
}

type ThemeContextType = {
	currentTheme: PaletteType;
	SwitchTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
	currentTheme: 'light',
	SwitchTheme: () => {},
});

export const primaryMain = '#000051';

const Theming = ({ children }: ThemingProps) => {
	const [currentTheme, setCurrentTheme] = React.useState<PaletteType>('light');

	const theme = createMuiTheme({
		palette: {
			type: currentTheme,
			primary: {
				main: primaryMain,
				dark: '#000051',
				light: '#534bae',
			},
			secondary: {
				main: '#e0f7fa',
				dark: '#aec4c7',
				light: '#ffffff',
			},
			common: {
				white: '#FFFFFF',
			},
		},
	});

	const SwitchTheme = (): void => {
		if (currentTheme === 'dark') {
			ThemeProcessor.SetCurrentTheme('light');
			setCurrentTheme('light');
		} else {
			ThemeProcessor.SetCurrentTheme('dark');
			setCurrentTheme('dark');
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<>
				<CssBaseline />
				<ThemeContext.Provider value={{ currentTheme, SwitchTheme }}>
					{children}
				</ThemeContext.Provider>
			</>
		</ThemeProvider>
	);
};

export default Theming;
