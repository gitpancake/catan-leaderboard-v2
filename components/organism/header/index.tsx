import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	useScrollTrigger,
	Container,
	Hidden,
	makeStyles,
	Button,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import WbSunny from '@material-ui/icons/WbSunny';
import ToggleButton from '@material-ui/lab/ToggleButton';

import Desktop from './Desktop';
import Pod from './Pod';
import { ThemeContext } from 'themes/MUI';

interface Props {
	children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
	header: {
		opacity: 0.8,
	},
	grow: {
		flexGrow: 1,
	},
	pod: {
		margin: '0 10px',
		textAlign: 'center',
	},
	creators: {
		color: theme.palette.common.white,
	},
	timeCapsule: {
		marginLeft: '10px',
	},
	butt: {
		backgroundColor: theme.palette.primary.dark,
	},
}));

const ElevationScroll = ({ children }: Props) => {
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

const Header = (props: Props) => {
	const { children } = props;
	const { SwitchTheme: switchTheme, currentTheme } = React.useContext(
		ThemeContext,
	);

	const classes = useStyles();

	return (
		<React.Fragment>
			<ElevationScroll {...props}>
				<AppBar className={classes.header}>
					<Toolbar>
						<Pod>
							<Typography variant="h5">
								Settlers <small>of</small> Catan
							</Typography>
						</Pod>

						<div className={classes.grow} />
						<Hidden mdDown>
							<Desktop />
						</Hidden>
						<Pod>
							<ToggleButton value={currentTheme} onClick={() => switchTheme()}>
								<WbSunny color="secondary" />
							</ToggleButton>
						</Pod>
						<Pod>
							<ExitToApp />
						</Pod>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
			<Container>{children}</Container>
		</React.Fragment>
	);
};

export default Header;
