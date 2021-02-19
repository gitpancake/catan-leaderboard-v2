import React from 'react';
import { PaletteType } from '@material-ui/core';

import * as ThemeProcessor from 'themes/themePicker';

interface Props {
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

const ThemeContextProvider = ({ children }: Props) => {
	const [currentTheme, setCurrentTheme] = React.useState<PaletteType>('light');

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
		<ThemeContext.Provider value={{ currentTheme, SwitchTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
