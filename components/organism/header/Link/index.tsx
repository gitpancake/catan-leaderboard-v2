import React from 'react';
import { makeStyles, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.common.white,
	},
}));

interface Props {
	children: React.ReactElement;
	onClick: () => void;
}

const HeaderLink = (props: Props) => {
	const { children, onClick } = props;

	const classes = useStyles();

	return (
		<Link className={classes.root} href="#" onClick={onClick}>
			{children}
		</Link>
	);
};

export default HeaderLink;
