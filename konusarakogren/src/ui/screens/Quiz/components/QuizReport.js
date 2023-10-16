import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Close, Completed } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';
import { getFormattedTime } from '../../../../utils/utility';
import AppButton from '../../../components/Button';
import QuizReportQuestions from './QuizReportQuestions';

const QuizReport = (props) => {

    const { startTime, quizReport, solveAgain, quizQuestions } = props;
    const strings = useLocalization();

    const [rightAnswersCount, setRightAnswersCount] = useState(0);
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
    const [emptyAnswersCount, setEmptyAnswersCount] = useState(0);

    const [showResult, setShowResult] = useState(false);

    // const navigation = useNavigation();

    const handleNavigation = () => {
        // navigation.navigate(routes.QUIZ)
        console.log("Ana Sayfa")
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

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.LT_GREY,
        borderRadius: units.height / 72,
        marginBottom: units.height / 48,
        width: units.width / 1.09,
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginVertical: units.height / 48,
        fontFamily: Fonts.type.bold,
        color: colors.BLACK,
        textAlign: 'center'
    },
    quizContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.LT_GREY,
        marginBottom: units.height / 36
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: Fonts.size(18),
        color: colors.ORANGE,
        textAlign: 'center',
        marginHorizontal: units.width / 10,
        marginTop: units.height / 72,
        marginBottom: units.height / 30
    },
    quizHeaderText: {
        marginBottom: units.height / 48,
        marginHorizontal: units.width / 36,
        fontSize: Fonts.size(14),
        fontFamily: Fonts.type.regular,
        color: colors.BLACK,
        textAlign: 'center'
    },
    reportContainer: {
        display: 'flex',
        gap: 12,
        marginTop: units.height / 72,
        marginBottom: units.height / 48,
    },
    reportContentContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: units.width / 1.2,
    },
    reportText: {
        width: units.width / 2.4,
        textAlign: 'right',
        fontFamily: Fonts.type.bold,
        paddingRight: 4,
    },
    reportValue: {
        width: units.width / 2.,
        paddingLeft: 4,
    },
    closeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    button: {
        marginVertical: units.height / 40,
    },
});

export default QuizReport;