import { PaletteType } from '@material-ui/core';

const currentThemeTag = 'current.theme.style';

export const SetCurrentTheme = (theme: PaletteType): void => {
	if (typeof window === 'undefined') {
		return;
	}

	localStorage.setItem(currentThemeTag, theme);
};

export const GetCurrentTheme = (): PaletteType => {
	if (typeof window === 'undefined') {
		return 'dark';
	}

	if (!localStorage.getItem(currentThemeTag)) {
		SetCurrentTheme('dark');
	}

	return localStorage.getItem(currentThemeTag) as PaletteType;
};

export const ChangeTheme = () => {
	if (typeof window === 'undefined') {
		return;
	}

	if (GetCurrentTheme() === 'dark') {
		SetCurrentTheme('light');
	} else {
		SetCurrentTheme('dark');
	}
};
