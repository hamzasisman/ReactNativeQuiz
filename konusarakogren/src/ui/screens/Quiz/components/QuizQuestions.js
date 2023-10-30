import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Close } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';
import { getFormattedTime } from '../../../../utils/utility';
import AppButton from '../../../components/Button';
import InfoModal from '../../../components/InfoModal';
import InfoModalTwoButtons from '../../../components/InfoModalTwoButtons';
import AnswerButton from './AnswerButton';
import QuizReport from './QuizReport';
import QuizTimer from './QuizTimer';
import Config from "react-native-config";

const quizInformationStaticData = {
    quizId: "cf81ed71-e3e8-4706-b7a1-4a939f09f4ab",
    questions: [
        {
            id: 1,
            content: "They ...... to a meeting at a company yesterday",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "will go", iscorrectAnswer: false },
                { id: 2, answer: "have gone", iscorrectAnswer: false },
                { id: 3, answer: "were going", iscorrectAnswer: true },
                { id: 4, answer: "was going", iscorrectAnswer: false },
            ],
        },
        {
            id: 2,
            content: "She always ...... her homework before going to bed.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "do", iscorrectAnswer: false },
                { id: 2, answer: "does", iscorrectAnswer: true },
                { id: 3, answer: "did", iscorrectAnswer: false },
                { id: 4, answer: "done", iscorrectAnswer: false },
            ],
        },
        {
            id: 3,
            content: "I ...... dinner when you called me last night.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "am eating", iscorrectAnswer: false },
                { id: 2, answer: "was eating", iscorrectAnswer: true },
                { id: 3, answer: "ate", iscorrectAnswer: false },
                { id: 4, answer: "have eaten", iscorrectAnswer: false },
            ],
        },
        {
            id: 4,
            content: "They ...... to the beach every summer.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "go", iscorrectAnswer: true },
                { id: 2, answer: "goes", iscorrectAnswer: false },
                { id: 3, answer: "went", iscorrectAnswer: false },
                { id: 4, answer: "gone", iscorrectAnswer: false },
            ],
        },
        {
            id: 5,
            content: "She is the best student in the class. She ...... studies very hard.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "usually", iscorrectAnswer: false },
                { id: 2, answer: "never", iscorrectAnswer: false },
                { id: 3, answer: "always", iscorrectAnswer: true },
                { id: 4, answer: "rarely", iscorrectAnswer: false },
            ],
        },
        {
            id: 6,
            content: "We ...... to the movies last night.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "are going", iscorrectAnswer: false },
                { id: 2, answer: "have gone", iscorrectAnswer: false },
                { id: 3, answer: "went", iscorrectAnswer: true },
                { id: 4, answer: "go", iscorrectAnswer: false },
            ],
        },
        {
            id: 7,
            content: "I ...... my keys. I can't find them anywhere.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "have lost", iscorrectAnswer: true },
                { id: 2, answer: "losing", iscorrectAnswer: false },
                { id: 3, answer: "lost", iscorrectAnswer: false },
                { id: 4, answer: "am losing", iscorrectAnswer: false },
            ],
        },
        {
            id: 8,
            content: "He ...... a book when I saw him yesterday.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "reads", iscorrectAnswer: false },
                { id: 2, answer: "is reading", iscorrectAnswer: false },
                { id: 3, answer: "read", iscorrectAnswer: false },
                { id: 4, answer: "was reading", iscorrectAnswer: true },
            ],
        },
        {
            id: 9,
            content: "We ...... to the party last night, but it was too crowded.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "went", iscorrectAnswer: true },
                { id: 2, answer: "go", iscorrectAnswer: false },
                { id: 3, answer: "have gone", iscorrectAnswer: false },
                { id: 4, answer: "going", iscorrectAnswer: false },
            ],
        },
        {
            id: 10,
            content: "I ...... coffee every morning before work.",
            languageTitleType: 4,
            questionContents: [],
            questionAnswers: [
                { id: 1, answer: "drink", iscorrectAnswer: true },
                { id: 2, answer: "drinks", iscorrectAnswer: false },
                { id: 3, answer: "drank", iscorrectAnswer: false },
                { id: 4, answer: "drunk", iscorrectAnswer: false },
            ],
        }
    ]
}

const QuizQuestions = (props) => {

    const { setSelectedQuiz, bookName } = props;
    const strings = useLocalization();

    const quizDuration = Config.QUIZ_TIME_PER_QUESTION_IN_SECOND / quizInformationStaticData.questions.length;

    // Servisten gelen quiz bilgileri bu state'in içerisine atılacak.
    const [quizInformation, setQuizInformation] = useState(quizInformationStaticData);

    // Sayaç durduğunda bu state true'ya çekilir.
    const [isTimerEnd, setIsTimerEnd] = useState(false);
    // Bu state 'true' sayaç durur. 'false' olduğunda sayaç devam eder.
    const [pauseTimer, setPauseTimer] = useState(false);
    // Kullanıcının aktif olarak olduğu sorunun indexini tutar.
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // Kullanıcının soruya verdiği cevabı tutar.
    const [userAnswer, setUserAnswer] = useState(-1);
    // Kullanıcının 'Kontrol Et' butonuna tıklama durumunu tutar.
    const [isClickedControlButton, setIsClickedControlButton] = useState(false);

    // Kullanıcının quizi başladığı zamanı tutar.
    const [startTime, setStartTime] = useState("");
    // Kullanıcının quizi bitirdiği zamanı tutar.
    const [quizReport, setQuizReport] = useState({});
    // Kullanıcının quizi bitirdiğinde rapor sayfasını göstermek için kullanılır.
    const [showQuizReport, setShowQuizReport] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalTwoButtonisibility, setModalTwoButtonisibility] = useState(false);

    //Rapor sayfasında 'Tekrar Çözmek İstiyorum' butonuna tıklandığında kullanılır.
    const solveAgain = () => {
        setCurrentQuestionIndex(currentQuestionIndex => 0);
        setShowQuizReport(showQuizReport => false);
        setIsTimerEnd(isTimerEnd => false);
        setStartTime(startTime => getFormattedTime(new Date()));
        setQuizReport({
            quizId: quizInformation.quizId,
            bookName: bookName,
            questions: quizInformation.questions.map((question) => ({
                id: question.id,
                rightAnswer: question.questionAnswers.find(answer => answer.iscorrectAnswer)?.id || -1,
                userAnswer: -1,
            })),
        });
    }

    //Butonun üzerinde "Boş Bırak", "Kontrol Et" ve "Devam Et" yazılarından uygun olanı seçmek için kullanılır.
    const buttonText = () => {
        if ((userAnswer === -1 && !isClickedControlButton)) return strings.quiz.leave_empty
        if ((quizReport.questions[currentQuestionIndex].userAnswer > 0 && !isClickedControlButton)) return strings.quiz.control
        if ((quizReport.questions[currentQuestionIndex].userAnswer > 0 && isClickedControlButton)) return strings.quiz.continue
    }

    // Kullanıcı soru değiştirdiğinde 'Kontrol Et' butonuna tıklanma durumunu sıfırlıyoruz.
    useEffect(() => {
        setIsClickedControlButton(isClickedControlButton => false);
    }, [currentQuestionIndex]);

    // Kullanıcının quize başladığı zaman saat:dakika:saniye şeklinde tutuluyor.
    useEffect(() => {
        setStartTime(startTime => getFormattedTime(new Date()));
    }, []);

    // Quiz Information bilgileri değiştiğinde quizReport objesini güncelliyoruz.
    useEffect(() => {
        if (Object.keys(quizInformation).length > 0) {
            setQuizReport({
                quizId: quizInformation.quizId,
                bookName: bookName,
                questions: quizInformation.questions.map((question) => ({
                    id: question.id,
                    rightAnswer: question.questionAnswers.find(answer => answer.iscorrectAnswer)?.id || -1,
                    userAnswer: -1,
                })),
            });
        }
    }, [quizInformation]);

    // Her soru değiştiğinde kullanıcının verdiği cevap sıfırlanır.
    useEffect(() => {
        setUserAnswer(-1);
    }, [currentQuestionIndex])

    // Kullanıcının cevapladığı soruları rapor sayfasında göstermek için kullanılır.
    // Bu objeye göre rapor sayfasında soruların doğru yanlış cevaplarını gösteriyoruz.
    useEffect(() => {
        if (userAnswer !== -1) {
            const updatedQuestions = [...quizReport.questions];
            updatedQuestions[currentQuestionIndex].userAnswer = userAnswer;
            setQuizReport((prevObject) => ({
                ...prevObject,
                questions: updatedQuestions,
            }));
        }
    }, [userAnswer]);

    // Süre dolduğunda rapor sayfasına yönlendirilir.
    useEffect(() => {
        isTimerEnd && setModalVisibility(modalVisibility => true)
    }, [isTimerEnd]);

    return (
        <>
            {(currentQuestionIndex === quizInformation.questions.length || showQuizReport) && (
                <QuizReport
                    startTime={startTime}
                    quizReport={quizReport}
                    quizQuestions={quizInformation.questions}
                    solveAgain={solveAgain}
                    setSelectedQuiz={setSelectedQuiz}
                />
            )}
            {(currentQuestionIndex !== quizInformation.questions.length && !showQuizReport) && (
                <>
                    <QuizTimer
                        duration={quizDuration}
                        setIsTimerEnd={setIsTimerEnd}
                        pauseTimer={pauseTimer}
                    />
                    <View style={styles.quizContainer}>
                        <TouchableOpacity
                            style={styles.closeContainer}
                            onPress={() => {
                                setPauseTimer(pauseTimer => true);
                                setModalTwoButtonisibility(modalTwoButtonisibility => true);
                            }}
                        >
                            <Close width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{bookName}</Text>
                        <Text style={styles.quizHeaderText}>
                            {currentQuestionIndex + 1}) {quizInformation.questions[currentQuestionIndex].content}
                        </Text>
                        <View style={styles.answerContainer}>
                            {quizInformation.questions[currentQuestionIndex].questionAnswers.map((answer, index) => (
                                <AnswerButton
                                    key={index}
                                    index={index}
                                    answer={answer}
                                    userAnswer={userAnswer}
                                    quizReport={Object.keys(quizReport).length > 0 && quizReport.questions[currentQuestionIndex]}
                                    currentQuestionIndex={currentQuestionIndex}
                                    isClickedControlButton={isClickedControlButton}
                                    onPress={() => {
                                        if (!isClickedControlButton) {
                                            setUserAnswer(userAnswer => answer.id);
                                        }
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                    <AppButton
                        onPress={() => {
                            if (userAnswer === -1 || (quizReport.questions[currentQuestionIndex].userAnswer > 0 && isClickedControlButton)) {
                                setCurrentQuestionIndex(currentQuestionIndex + 1)
                                setIsClickedControlButton(isClickedControlButton => false);

                            } else if (quizReport.questions[currentQuestionIndex].userAnswer > 0 && !isClickedControlButton) {
                                setIsClickedControlButton(true);
                            }
                        }}
                        title={buttonText()}
                    />
                </>
            )}
            <InfoModal
                visibility={modalVisibility}
                message={strings.quiz.timer_end_description}
                buttonText={strings.quiz.show_report}
                onPress={() => {
                    setModalVisibility(false);
                    setShowQuizReport(showQuizReport => true);
                }}
            />
            <InfoModalTwoButtons
                visibility={modalTwoButtonisibility}
                firstButtonText={strings.log_out_drawer}
                onPressFirst={() => {
                    //seçili olan quiz'i sıfırlayarak başlangıç sayfasına dönmesini sağlıyoruz.
                    setSelectedQuiz(selectedQuiz => "");
                    setModalTwoButtonisibility(false);
                }}
                secondButtonText={strings.quiz.want_continue}
                onPressSecond={() => {
                    setPauseTimer(pauseTimer => false);
                    setModalTwoButtonisibility(false);
                }}
                message={strings.quiz.quit_modal_text}
            />
        </>
    );
};

const styles = StyleSheet.create({
    quizContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: units.height / 72,
        paddingHorizontal: units.height / 72,
        borderWidth: units.height / 500,
        borderColor: colors.LT_GREY,
        marginBottom: units.height / 36,
        width: units.width / 1.09,
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

export default QuizQuestions;