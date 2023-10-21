import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import {
  Menu,
  BackButton,
  Logo,
  NotificationOff,
  NotificationOn
} from '../../assets/svgs';
import { colors } from '../../theme/Colors';
import { units } from '../../theme/Units';
import Fonts from '../../theme/Fonts';

const TopMenu = ({
  isHomepage,
  notification,
  onPressNotification,
  onPressMenu,
  onPressBack,
  title = 'Azer İngilisce'
}) => {
  const NotificationIcon = () => {
    if (notification) {
      return <NotificationOn width="100%" height="100%" />;
    } else {
      return <NotificationOff width="100%" height="100%" />;
    }
  };

  if (isHomepage) {
    return (
      <>
        <View
          style={[styles.container, { paddingVertical: units.height / 37.5 }]}>
          <View style={styles.logoAndBrandContainer}>
            <View style={styles.logo}>
              <Logo width="100%" height="100%" />
            </View>
            <Text style={styles.brand} allowFontScaling={false}>
              {title}
            </Text>
          </View>
          <View style={styles.topMenuButtons}>
            {/* Deleted for v1.0.0 */}
            <TouchableOpacity style={styles.menu} onPress={onPressMenu}>
              <Menu width="100%" height="100%" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          {onPressBack && (
            <TouchableOpacity
              hitSlop={{
                top: units.height / 27,
                bottom: units.height / 27,
                left: units.height / 27,
                right: units.height / 27
              }}
              style={styles.icon}
              onPress={onPressBack}>
              <BackButton width="100%" height="100%" />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.title,
              !onPressBack && { marginLeft: units.height / 20 }
            ]}
            allowFontScaling={false}>
            {title}
          </Text>
          <TouchableOpacity
            hitSlop={{
              top: units.height / 27,
              bottom: units.height / 27,
              left: units.height / 27,
              right: units.height / 27
            }}
            style={styles.icon}
            onPress={onPressMenu}>
            <Menu width="100%" height="100%" />
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: units.width,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: units.width / 18,
    paddingVertical: units.height / 29,
    justifyContent: 'space-between',
    borderBottomWidth: units.height / 500,
    borderColor: colors.LINE_PINK
  },
  icon: {
    width: units.height / 24,
    height: units.height / 24
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(16),
    color: colors.BLACK,
    textAlign: 'center',
    width: units.width / 1.5
  },
  logoAndBrandContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: units.height / 20,
    height: units.height / 17.5
  },
  brand: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(18),
    color: colors.BLACK,
    marginLeft: units.width / 27,
    width: units.width / 1.9
  },
  topMenuButtons: {
    flexDirection: 'row'
  },
  menu: {
    width: units.height / 24,
    height: units.height / 24,
    marginLeft: units.width / 27
  }
});

export default TopMenu;
