/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'intl';
import 'intl/locale-data/jsonp/en';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

admob()
  .setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
  })
  .then(() => {
    console.log('admob request configuration successfully');
  });

AppRegistry.registerComponent(appName, () => App);
