import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
	root: {
		margin: '0 10px',
		textAlign: 'center',
	},
});

interface Props {
	children: React.ReactElement;
}

const Pod = ({ children }: Props) => {
	const classes = useStyles();

	return <div className={classes.root}>{children}</div>;
};

export default Pod;
