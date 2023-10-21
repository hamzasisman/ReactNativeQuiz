import React from 'react';
import {
  Text, TouchableOpacity,
  View
} from 'react-native';

import {
  BackButton,
  Logo, Menu, NotificationOff,
  NotificationOn
} from '../../assets/svgs';
import { units } from '../../theme/Units';

import stylesLTR from '../styles/components/TopMenu/ltr';
import stylesRTL from '../styles/components/TopMenu/rtl';

const TopMenu = ({
  isHomepage,
  notification,
  onPressNotification,
  onPressMenu,
  onPressBack,
  title = 'Alingliziah',
}) => {
  // const {language} = useSelector(state => state.locale);
  const language = 'al';
  const styles = language === 'al' ? stylesRTL : stylesLTR;

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
          style={[styles.container, {paddingVertical: units.height / 37.5}]}>
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
            <TouchableOpacity style={[styles.icon, {transform: [{ rotate: '360deg' }]}]} onPress={onPressNotification}>
              <NotificationIcon />
            </TouchableOpacity>
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
        {
            onPressBack &&
            <TouchableOpacity
              hitSlop={{
                top: units.height / 27,
                bottom: units.height / 27,
                left: units.height / 27,
                right: units.height / 27,
              }}
              style={styles.icon}
              onPress={onPressBack}>
              <BackButton width="100%" height="100%" />
            </TouchableOpacity>
          }
          <Text style={[styles.title, !onPressBack && {marginLeft:units.height / 20}]} allowFontScaling={false}>
            {title}
          </Text>
          <TouchableOpacity
            hitSlop={{
              top: units.height / 27,
              bottom: units.height / 27,
              left: units.height / 27,
              right: units.height / 27,
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

export default TopMenu;
