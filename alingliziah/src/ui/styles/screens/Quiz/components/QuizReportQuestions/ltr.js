import { StyleSheet } from 'react-native';
import { colors } from '../../../../../../theme/Colors';
import Fonts from '../../../../../../theme/Fonts';
import { units } from '../../../../../../theme/Units';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        paddingVertical: units.height / 36,
        borderWidth: units.height / 500,
        borderColor: colors.BORDER_PINK,
        marginBottom: units.height / 3
    },
    questionContainer: {
        // marginBottom: 40,
    },
    quizHeaderText: {
        marginBottom: units.height / 48,
        marginHorizontal: units.width / 36,
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
    },
    answersContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginVertical: units.height / 150,
        borderWidth: 1,
        borderColor: colors.LINE_ORANGE,
        backgroundColor: colors.LT_PINK,
        overflow: 'hidden'
    },
    answerText: {
        fontSize: Fonts.size(16),
        fontFamily: Fonts.type.regular,
        marginLeft: units.width / 45,
        width: units.width / 1.3,
        color: colors.BLACK
    },
    answer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    answerIcon: {
        paddingHorizontal: units.width / 35,
        paddingVertical: units.height / 50,
        borderColor: colors.LINE_ORANGE,
        borderRightWidth: 1,
        backgroundColor: colors.LT_ORANGE
    },
});