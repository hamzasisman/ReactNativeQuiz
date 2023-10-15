import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import { units } from '../../../../theme/Units';

const QuizReportQuestions = ({ quizQuestions, quizReport }) => {
    const strings = useLocalization();

    return (
        <View style={styles.container}>
            {quizQuestions.map((item, questionIndex) => (
                <View key={questionIndex}>
                    <Text>{questionIndex+1}) {item.question}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.LT_GREY,
        marginBottom: units.height / 36
    },
});

export default QuizReportQuestions;