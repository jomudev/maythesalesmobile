/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from '@react-native-firebase/admob';
import menuListStyles from './Inventario/styles';

const BannerUnitId = 'ca-app-pub-8903466117529509/6769370981';

const ReportBannerUnitId = 'ca-app-pub-8903466117529509/6662646854';

const InterstitialUnitId = 'ca-app-pub-8903466117529509/1216057711';

const interstitialAdConfig = {
  requestNonPersonalAdsOnly: true,
  keywords: ['delivery', 'marketing', 'deal', 'business', 'finances'],
};

function HomeBannerAd({height}) {
  const [isHidden, hide] = useState(false);
  return (
    <View
      style={{
        height: height || 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BannerAd
        onAdFailedToLoad={() => hide(true)}
        unitId={BannerUnitId}
        size={height ? BannerAdSize.ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
}

function ReportsBannerAd({height}) {
  const [isHidden, hide] = useState(false);

  return isHidden && (
    <View
      style={{
        height: height || 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BannerAd
        onAdFailedToLoad={() => hide(true)}
        unitId={ReportBannerUnitId}
        size={height ? BannerAdSize.ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
}

function BannerAdvertiser({height}) {
  const [isHidden, hide] = useState(false);

  return isHidden && (
    <View
      style={{
        height: height || 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BannerAd
        onAdFailedToLoad={() => hide(true)}
        unitId={ReportBannerUnitId}
        size={height ? BannerAdSize.ADAPTIVE_BANNER : BannerAdSize.LARGE_BANNER}
      />
    </View>
  );
}

export {
  HomeBannerAd,
  ReportsBannerAd,
  BannerAdvertiser,
  InterstitialUnitId,
  interstitialAdConfig,
};
