/**
 * @format
 */
import './src/lib/solana/polyfill';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Account does not exist',
  'Error: failed to send transaction:',
]);

AppRegistry.registerComponent(appName, () => App);
