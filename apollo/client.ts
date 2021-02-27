import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache({
		typePolicies: {
			League: {
				keyFields: ['_id'],
			},
			Player: {
				keyFields: ['_id'],
			},
		},
	}),
});

export default client;
