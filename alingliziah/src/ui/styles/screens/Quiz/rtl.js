import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';

export default StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: units.width,
      },
      scrollViewContainer: {
        marginHorizontal: units.width / 36,
        marginTop: units.width / 24,
        marginBottom: units.height / 3.4
      },
      title: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(18),
        color: colors.BLUE,
        textAlign: 'center',
        marginHorizontal: units.width / 10,
        marginTop: units.height / 72,
        marginBottom: units.height / 30
      },
      headerContainer: {
        backgroundColor: colors.SOFT_ORANGE,
        borderRadius: units.height / 72,
        marginBottom: units.height / 48
      },
      headerText: {
        marginVertical: units.height / 48,
        marginHorizontal: units.width / 12,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
      },
      quizContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.BORDER_PINK,
        marginBottom: units.height / 36
      },
      quizHeaderText: {
        marginBottom: units.height / 48,
        marginHorizontal: units.width / 36,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
      },
      text: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(14),
        color: colors.BLACK,
        marginVertical: units.height / 45,
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      seperator: {
        marginHorizontal: units.width / 25,
        height: units.height / 500,
        backgroundColor: colors.BORDER_PINK
      },
      contentContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
      },
      rightContainer: {
        marginLeft: units.width / 48,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 2,
      },
      playButtonContainer: {
        backgroundColor: colors.ORANGE,
        borderRadius: 10,
        borderColor: colors.BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: units.height / 144,
        paddingHorizontal: units.width / 60,
        transform: [{ rotate: '180deg' }]
      },
      arrowContainer: {
        alignItems: 'center',
      },
      rotate: {
        transform: [{ rotate: '180deg' }]
      },
      bottomMessage: {
        color: colors.TEXT_GRAY,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.regular,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 2,
        textAlign: 'center',
        marginBottom: 10,
      },
      imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      icon: {
        position: 'absolute',
        zIndex: 1
      },
      book: {
        width: units.width / 1.4,
        height: units.height / 4
      },
      closeImage: {
        position: 'absolute',
        zIndex: 1,
        top: units.height / -45,
        right: units.width / 75
      },
      closeImageAndroid: {
        top: units.height / 12,
        right: units.width / 18,
        position: 'absolute',
        zIndex: 1
      },
      modal: {
        flex: 1,
        marginHorizontal: units.height / 100,
        marginVertical: units.height / 10
      },
      overlay: {
        position: 'absolute',
        zIndex: 99999,
        top: units.height / 3.3,
        left: units.width / 3.7
      },
      animation: {
        width: units.width / 2.5
      },
      webview: {
        backgroundColor: 'transparent',
        marginTop: units.height / 4.2
      }
});