/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import menuListStyles from './Inventario/styles';
const BannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-890346611752950s9/6769370981';

const Banner = () => (
  <BannerAd unitId={BannerUnitId} size={BannerAdSize.SMART_BANNER} />
);

const MenuListBannerAd = () => (
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

export {Banner, MenuListBannerAd};
