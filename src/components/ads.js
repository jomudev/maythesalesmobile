/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
} from '@react-native-firebase/admob';
import menuListStyles from './Inventario/styles';

const BannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8903466117529509/6769370981';

const ReportBannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8903466117529509/6662646854';

const InterstitialUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8903466117529509/1216057711';

const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, {
  keywords: ['delivery', 'marketing', 'deal', 'business'],
  requestNonPersonalAdsOnly: true,
});

function HomeBannerAd({height}) {
  return (
    <View
      style={{
        height: height || 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BannerAd
        unitId={BannerUnitId}
        size={height ? BannerAdSize.ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
}

function ReportsBannerAd({height}) {
  return (
    <View
      style={{
        height: height || 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BannerAd
        unitId={ReportBannerUnitId}
        size={height ? BannerAdSize.ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER}
      />
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

export {
  HomeBannerAd,
  ReportsBannerAd,
  MenuListBannerAdvert,
  InterstitialUnitId,
  interstitial,
};
