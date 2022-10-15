import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import CustomersScreen from './screens/CustomersScreen';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:5001/api/ironic-monkey',
  //uri: 'https://cherrycreek.stepzen.net/api/ironic-monkey/__graphql',
  //uri: 'http://193.0.218.164:5001/api/ironic-monkey',
  //uri: 'http://10.0.2.2:5001/api/ironic-monkey',
  //uri: 'http://127.0.0.1:5001/api/ironic-monkey',
  uri: 'http://192.168.1.93:5001/api/ironic-monkey',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
