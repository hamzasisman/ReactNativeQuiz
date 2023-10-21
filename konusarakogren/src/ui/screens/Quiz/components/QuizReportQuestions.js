import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';
import { getAnswerTitleByIndex } from '../../../../utils/utility';

const QuizReportQuestions = ({ quizQuestions, quizReport }) => {
    const strings = useLocalization();

    return (
        <ScrollView style={styles.container}>
            {quizQuestions.map((item, questionIndex) => (
                <View
                    key={questionIndex}
                    style={[styles.questionContainer,
                    {
                        marginTop: questionIndex !== 0 ? 40 : 0
                    }]}
                >
                    <Text style={styles.quizHeaderText}>{questionIndex + 1}) {item.question}</Text>
                    <View>
                        {item.answers.map((answer, index) => {

                            // Kullanıcının soruyu boş geçmediyse doğru cevabı yeşil yakıyoruz.
                            let rightAnswerButton = (quizReport.questions[questionIndex].rightAnswer === answer.id) && (quizReport.questions[questionIndex].userAnswer !== -1);
                            // Kullanıcının seçtiği cevap yanlışsa seçili cevabı kırmızı yakıyoruz.
                            let wrongAnswerButton = (quizReport.questions[questionIndex].userAnswer !== quizReport.questions[questionIndex].right_answer && quizReport.questions[questionIndex].userAnswer === answer.id)

                            return (
                                <View
                                    key={index}
                                    style={[styles.answersContainer,
                                    {
                                        backgroundColor: rightAnswerButton
                                            ? colors.QUIZ_GREEN
                                            : wrongAnswerButton
                                                ? colors.MD_RED
                                                : colors.WHITE,
                                    }
                                    ]}>
                                    <View style={styles.answer}>
                                        <View style={[styles.answerIcon, {
                                            backgroundColor: rightAnswerButton
                                                ? colors.QUIZ_GREEN
                                                : wrongAnswerButton
                                                    ? colors.MD_RED
                                                    : colors.WH_GREY,
                                            borderColor: (rightAnswerButton || wrongAnswerButton)
                                                ? colors.WHITE
                                                : colors.MD_GREY
                                        }]}>
                                            <Text
                                                style={[styles.answerChoice, {
                                                    color: (rightAnswerButton || wrongAnswerButton)
                                                        ? colors.WHITE
                                                        : colors.BLACK
                                                }]}
                                            >
                                                {getAnswerTitleByIndex(index)}
                                            </Text>
                                        </View>
                                        <Text style={[styles.answerText, {
                                            color: (rightAnswerButton || wrongAnswerButton)
                                                ? colors.WHITE
                                                : colors.BLACK
                                        }]}> {answer.answer}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        paddingVertical: units.height / 36,
        borderWidth: units.height / 500,
        borderColor: colors.LT_GREY,
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
        borderColor: colors.MD_GREY,
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
        borderColor: colors.MD_GREY,
        borderRightWidth: 1,
        backgroundColor: colors.WH_GREY
    },
});

export default QuizReportQuestions;