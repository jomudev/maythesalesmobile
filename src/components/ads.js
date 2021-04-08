/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import menuListStyles from './Inventario/styles';
const BannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8903466117529509/6769370981';

const InterstitialUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8903466117529509/1216057711';

function BannerAdvert() {
  return (
    <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
      <BannerAd unitId={BannerUnitId} size={BannerAdSize.LARGE_BANNER} />
    </View>
  );
}

const MenuListBannerAdvert = () => (
  <View
    style={{
      ...menuListStyles.menuListItem,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <BannerAd unitId={BannerUnitId} size={BannerAdSize.LARGE_BANNER} />
  </View>
);

export {BannerAdvert, MenuListBannerAdvert, InterstitialUnitId};
