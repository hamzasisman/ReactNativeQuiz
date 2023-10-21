import { StyleSheet } from 'react-native';
import { colors } from '../../../../../../theme/Colors';
import Fonts from '../../../../../../theme/Fonts';
import { units } from '../../../../../../theme/Units';

export default StyleSheet.create({
    quizContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.BORDER_PINK,
        marginBottom: units.height / 36,
        width: units.width / 1.09,
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
    quizHeaderText: {
        marginBottom: units.height / 48,
        marginHorizontal: units.width / 36,
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
    },
    answerContainer: {
        marginVertical: units.height / 40,
        display: 'flex',
    },
    closeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
});