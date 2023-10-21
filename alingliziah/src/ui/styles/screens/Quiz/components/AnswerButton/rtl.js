import { StyleSheet } from 'react-native';
import { colors } from '../../../../../../theme/Colors';
import Fonts from '../../../../../../theme/Fonts';
import { units } from '../../../../../../theme/Units';

export default StyleSheet.create({
    answersContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        marginRight: units.width / 45,
        width: units.width / 1.3,
        color: colors.BLACK,
        textAlign: 'right',
    },
    answer: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    answerIcon: {
        paddingHorizontal: units.width / 35,
        paddingVertical: units.height / 50,
        borderColor: colors.LINE_ORANGE,
        borderLeftWidth: 1,
        backgroundColor: colors.LT_ORANGE
    },
});