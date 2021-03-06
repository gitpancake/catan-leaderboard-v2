import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, Input } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { LeagueContext } from 'context/leagues';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
	},
}));

const CreateLeaguePopover: React.FC = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const [leagueName, setLeagueName] = React.useState<string>('');

	const { createLeague } = React.useContext(LeagueContext);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Typography onClick={handleClick}>Create League</Typography>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Grid
					item
					container
					md={12}
					justify="space-between"
					alignItems="center"
					className={classes.root}
				>
					<Grid item md={9}>
						<Input
							placeholder="League Name..."
							value={leagueName}
							onChange={(event) => setLeagueName(event.target.value)}
						/>
					</Grid>
					<Grid item md={3}>
						<IconButton
							onClick={() => {
								createLeague(leagueName);
							}}
						>
							<Add />
						</IconButton>
					</Grid>
				</Grid>
			</Popover>
		</div>
	);
};

export default CreateLeaguePopover;
