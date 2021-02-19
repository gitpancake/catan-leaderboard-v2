import React from 'react';
import { Header } from 'components';

interface LayoutProps {
	children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
	return <Header>{children}</Header>;
};

export default Layout;
