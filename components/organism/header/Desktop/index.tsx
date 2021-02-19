import { Button, Link, Typography } from '@material-ui/core';
import React from 'react';

import Pod from '../Pod';

const DesktopHeader = () => {
	return (
		<React.Fragment>
			<Pod>
				<Link color="secondary" href="#" onClick={() => console.log('clicked')}>
					<Typography>Create Fixture</Typography>
				</Link>
			</Pod>
			<Pod>
				<Link color="secondary" href="#" onClick={() => console.log('clicked')}>
					<Typography>Create League</Typography>
				</Link>
			</Pod>
			<Pod>
				<Button variant="contained" color="secondary">
					Enter Results
				</Button>
			</Pod>
		</React.Fragment>
	);
};

export default DesktopHeader;
