import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { units } from '../../theme/Units';
import { colors } from '../../theme/Colors';
import { Attention } from '../../assets/svgs';
import { useLocalization } from '../../hooks/useLocalization';
import Fonts from '../../theme/Fonts';

function OfflineNotice() {
  const strings = useLocalization();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const status = state.isConnected && state.isInternetReachable;
      setIsOnline(status);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return isOnline ? null : (
    <View style={[styles.container]}>
      <Attention
        width={units.height / 28}
        height={units.height / 28}
        style={styles.icon}
      />
      <Text style={styles.text}>{strings.no_internet}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.BLACK,
    height: units.height / 13,
    margin: units.height / 55,
    borderRadius: units.height / 55
  },
  text: {
    color: colors.WHITE,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.regular
  },
  icon: {
    marginLeft: units.width / 25,
    marginRight: units.width / 33
  }
});

export default OfflineNotice;
