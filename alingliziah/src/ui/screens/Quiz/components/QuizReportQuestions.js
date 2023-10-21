import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../../theme/Colors';
import { getAnswerTitleByIndex } from '../../../../utils/utility';

import stylesLTR from '../../../styles/screens/Quiz/components/QuizReportQuestions/ltr';
import stylesRTL from '../../../styles/screens/Quiz/components/QuizReportQuestions/rtl';

const QuizReportQuestions = ({ quizQuestions, quizReport }) => {

    // const {language} = useSelector(state => state.locale);
    const language = 'al';
    const styles = language === 'al' ? stylesRTL : stylesLTR;

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
                                                    : colors.LT_ORANGE,
                                            borderColor: (rightAnswerButton || wrongAnswerButton)
                                                ? colors.WHITE
                                                : colors.LINE_ORANGE
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

export default QuizReportQuestions;