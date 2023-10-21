import { StyleSheet } from 'react-native';

import { units } from '../../../../theme/Units';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';

export default StyleSheet.create({
  container: {
    width: units.width,
    backgroundColor: colors.WHITE,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: units.width / 18,
    paddingVertical: units.height / 29,
    justifyContent: 'space-between',
    borderBottomWidth: units.height / 500,
    borderColor: colors.LINE_PINK,
  },
  icon: {
    width: units.height / 24,
    height: units.height / 24,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(16),
    color: colors.BLACK,
    textAlign: 'center',
    width: units.width / 1.5,
  },
  logoAndBrandContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  logo: {
    width: units.height / 20,
    height: units.height / 17.5,
  },
  brand: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(18),
    color: colors.BLACK,
    marginRight: units.width / 27,
    width: units.width / 1.9,
    textAlign: 'right',
  },
  topMenuButtons: {
    flexDirection: 'row-reverse',
  },
  menu: {
    width: units.height / 24,
    height: units.height / 24,
    marginRight: units.width / 27,
  },
});
