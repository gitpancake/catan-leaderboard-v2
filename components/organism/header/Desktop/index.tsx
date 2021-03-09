import { Link, Typography } from '@material-ui/core';
import { CreateLeaguePopover, EnterResultsModal, Schedule } from 'components';
import React from 'react';

import Pod from '../Pod';

const DesktopHeader = () => {
	return (
		<React.Fragment>
			<Pod>
				<Schedule />
			</Pod>
			<Pod>
				<Link color="secondary" href="#">
					<Typography>Create Fixture</Typography>
				</Link>
			</Pod>
			<Pod>
				<Link color="secondary" href="#">
					<CreateLeaguePopover />
				</Link>
			</Pod>
			<Pod>
				<EnterResultsModal />
			</Pod>
		</React.Fragment>
	);
};

export default DesktopHeader;
