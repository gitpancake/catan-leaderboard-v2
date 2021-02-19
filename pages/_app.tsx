import React from 'react';
import '../styles/globals.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';
import ThemeProvider from 'themes/MUI';
import Layout from 'structure/layout';

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Auth0Provider
			domain="e-nvm.eu.auth0.com"
			clientId="kD2u7JvEaZ5QklFtVi3C237vMTLRE90E"
			redirectUri={'http://localhost:3000'}
		>
			<ApolloProvider client={client}>
				<ThemeProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</ApolloProvider>
		</Auth0Provider>
	);
}

export default MyApp;
