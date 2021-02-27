import * as React from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

interface Props {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string; text: string }[];
}

const Dropdown = ({ value, onChange, options }: Props) => {
	return (
		<Select fullWidth value={value} onChange={onChange}>
			{options.map((option, index) => (
				<MenuItem key={index} value={option.value}>
					{option.text}
				</MenuItem>
			))}
		</Select>
	);
};

export default Dropdown;
