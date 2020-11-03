/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'moment/locale/es';

AppRegistry.registerComponent(appName, () => App);
