import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Close, Completed } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import { getFormattedTime } from '../../../../utils/utility';
import AppButton from '../../../components/Button';
import QuizReportQuestions from './QuizReportQuestions';

import { useSelector } from 'react-redux';
import stylesLTR from '../../../styles/screens/Quiz/components/QuizReport/ltr';
import stylesRTL from '../../../styles/screens/Quiz/components/QuizReport/rtl';

const QuizReport = (props) => {

    const { startTime, quizReport, solveAgain, quizQuestions, setSelectedQuiz } = props;
    const {language} = useSelector(state => state.locale);
    const styles = language === 'al' ? stylesRTL : stylesLTR;
    const strings = useLocalization();

    const [rightAnswersCount, setRightAnswersCount] = useState(0);
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
    const [emptyAnswersCount, setEmptyAnswersCount] = useState(0);

    const [showResult, setShowResult] = useState(false);

    // const navigation = useNavigation();

    const handleNavigation = () => {
        //seçili olan quiz'i sıfırlayarak başlangıç sayfasına dönmesini sağlıyoruz.
        setSelectedQuiz( selectedQuiz => "")
    };

    // QuizReport değiştiğinde doğru, yanlış ve boş cevap sayılarını hesaplar
    useEffect(() => {
        if (Object.keys(quizReport).length > 0) {
            let rightAnswers = 0;
            let wrongAnswers = 0;
            let emptyAnswers = 0;
            quizReport.questions.map((item) => {
                if (item.userAnswer === -1) {
                    emptyAnswers++;
                } else if (item.userAnswer === item.rightAnswer) {
                    rightAnswers++;
                } else {
                    wrongAnswers++;
                }
            });
            setRightAnswersCount(rightAnswers);
            setWrongAnswersCount(wrongAnswers);
            setEmptyAnswersCount(emptyAnswers);
        }
    }, [quizReport]);

    return (
        <View>
            <View style={styles.headerContainer}>
                <Completed width={30} height={30} />
                <Text style={styles.headerText}>{strings.quiz.quiz_completed}</Text>
            </View>

            <View style={styles.quizContainer}>
                <TouchableOpacity
                    style={styles.closeContainer}
                    onPress={handleNavigation}
                >
                    <Close width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.title}>{quizReport.bookName}</Text>
                <Text style={styles.quizHeaderText}>
                    {strings.quiz.report_description}
                </Text>

                <View style={styles.reportContainer}>
                    <View style={styles.reportContentContainer}>
                        <Text style={styles.reportText}>{strings.quiz.start_time}: </Text>
                        <Text style={styles.reportValue}>{startTime}</Text>
                    </View>
                    <View style={styles.reportContentContainer}>
                        <Text style={styles.reportText}>{strings.quiz.end_time}: </Text>
                        <Text style={styles.reportValue}>{getFormattedTime(new Date())}</Text>
                    </View>
                    <View style={styles.reportContentContainer}>
                        <Text style={styles.reportText}>{strings.quiz.total_question}: </Text>
                        <Text style={styles.reportValue}>{quizReport.questions.length}</Text>
                    </View>
                    <View style={styles.reportContentContainer}>
                        <Text style={[styles.reportText, { color: colors.QUIZ_GREEN }]}>{strings.quiz.right_answer}: </Text>
                        <Text style={styles.reportValue}>{rightAnswersCount}</Text>
                    </View>
                    <View style={styles.reportContentContainer}>
                        <Text style={[styles.reportText, { color: colors.MD_RED }]}>{strings.quiz.wrong_answer}: </Text>
                        <Text style={styles.reportValue}>{wrongAnswersCount}</Text>
                    </View>
                    <View style={styles.reportContentContainer}>
                        <Text style={[styles.reportText, { color: colors.TAB_GREY }]}>{strings.quiz.empty_answer}: </Text>
                        <Text style={styles.reportValue}>{emptyAnswersCount}</Text>
                    </View>
                </View>
            </View>
            <AppButton
                onPress={() => {
                    solveAgain();
                }}
                title={strings.quiz.solve_again}
            />
            <AppButton
                title={strings.quiz.show_result}
                buttonStyles={styles.button}
                bgColor={colors.WHITE}
                textColor="BLUE"
                onPress={() => {
                    setShowResult(showResult => true);
                }}
            />

            {showResult && (
                <QuizReportQuestions
                    quizQuestions={quizQuestions}
                    quizReport={quizReport}
                />
            )}
        </View>
    );
};

export default QuizReport;