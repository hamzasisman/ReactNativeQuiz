import { DefaultTheme } from '@react-navigation/native';
import { colors } from '../theme/Colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.BLACK,
    background: colors.WHITE
  }
};
