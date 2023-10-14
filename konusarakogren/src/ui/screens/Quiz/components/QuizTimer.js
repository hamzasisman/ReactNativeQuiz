import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Timer } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';

const QuizTimer = ({ books, setSelectedQuiz }) => {
    const strings = useLocalization();

    return (
        <View style={styles.headerContainer}>
            <Timer width='100%' height='100%' />
            <Text style={styles.headerText}>Hamza</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.LT_GREY,
        borderRadius: units.height / 72,
        marginBottom: units.height / 48,
        width: units.width / 1.09,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginVertical: units.height / 48,
        marginHorizontal: units.width / 12,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
    },
});

export default QuizTimer;