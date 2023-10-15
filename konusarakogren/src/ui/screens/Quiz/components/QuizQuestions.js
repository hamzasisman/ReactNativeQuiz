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
import AnswerButton from './AnswerButton';
import QuizReport from './QuizReport';
import QuizTimer from './QuizTimer';

const quizInformationStaticData = {
    quizId: "cf81ed71-e3e8-4706-b7a1-4a939f09f4ab",
    bookName: "Beginner / Level 2 / Unit 1",
    duration: 100,
    questions: [
        {
            id: 1,
            question: "They ...... to a meeting at a company yesterday",
            answers: [
                { id: 1, answer: "will go" },
                { id: 2, answer: "have gone" },
                { id: 3, answer: "were going" },
                { id: 4, answer: "was going" },
            ],
            rightAnswer: 3
        },
        {
            id: 2,
            question: "She always ...... her homework before going to bed.",
            answers: [
                { id: 1, answer: "do" },
                { id: 2, answer: "does" },
                { id: 3, answer: "did" },
                { id: 4, answer: "done" },
            ],
            rightAnswer: 2
        },
        {
            id: 3,
            question: "I ...... dinner when you called me last night.",
            answers: [
                { id: 1, answer: "am eating" },
                { id: 2, answer: "was eating" },
                { id: 3, answer: "ate" },
                { id: 4, answer: "have eaten" },
            ],
            rightAnswer: 2
        },
        {
            id: 4,
            question: "They ...... to the beach every summer.",
            answers: [
                { id: 1, answer: "go" },
                { id: 2, answer: "goes" },
                { id: 3, answer: "went" },
                { id: 4, answer: "gone" },
            ],
            rightAnswer: 1
        },
        {
            id: 5,
            question: "She is the best student in the class. She ...... studies very hard.",
            answers: [
                { id: 1, answer: "usually" },
                { id: 2, answer: "never" },
                { id: 3, answer: "always" },
                { id: 4, answer: "rarely" },
            ],
            rightAnswer: 3
        },
        {
            id: 6,
            question: "We ...... to the movies last night.",
            answers: [
                { id: 1, answer: "are going" },
                { id: 2, answer: "have gone" },
                { id: 3, answer: "went" },
                { id: 4, answer: "go" },
            ],
            rightAnswer: 3
        },
        {
            id: 7,
            question: "I ...... my keys. I can't find them anywhere.",
            answers: [
                { id: 1, answer: "have lost" },
                { id: 2, answer: "losing" },
                { id: 3, answer: "lost" },
                { id: 4, answer: "am losing" },
            ],
            rightAnswer: 1
        },
        {
            id: 8,
            question: "He ...... a book when I saw him yesterday.",
            answers: [
                { id: 1, answer: "reads" },
                { id: 2, answer: "is reading" },
                { id: 3, answer: "read" },
                { id: 4, answer: "was reading" },
            ],
            rightAnswer: 4
        },
        {
            id: 9,
            question: "We ...... to the party last night, but it was too crowded.",
            answers: [
                { id: 1, answer: "went" },
                { id: 2, answer: "go" },
                { id: 3, answer: "have gone" },
                { id: 4, answer: "going" },
            ],
            rightAnswer: 1
        },
        {
            id: 10,
            question: "I ...... coffee every morning before work.",
            answers: [
                { id: 1, answer: "drink" },
                { id: 2, answer: "drinks" },
                { id: 3, answer: "drank" },
                { id: 4, answer: "drunk" },
            ],
            rightAnswer: 1
        }
    ]
}

const QuizQuestions = (props) => {

    const { quizId } = props;
    const strings = useLocalization();

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

    //Rapor sayfasında 'Tekrar Çözmek İstiyorum' butonuna tıklandığında kullanılır.
    const solveAgain = () => {
        setCurrentQuestionIndex(currentQuestionIndex => 0);
        setShowQuizReport(showQuizReport => false);
        setIsTimerEnd(isTimerEnd => false);
        setStartTime(startTime => getFormattedTime(new Date()));
        setQuizReport({
            quizId: quizInformation.quizId,
            bookName: quizInformation.bookName,
            questions: quizInformation.questions.map((item) => ({
                id: item.id,
                rightAnswer: item.rightAnswer,
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
                bookName: quizInformation.bookName,
                questions: quizInformation.questions.map((item) => ({
                    id: item.id,
                    rightAnswer: item.rightAnswer,
                    userAnswer: -1,
                })),
            });
        }
    }, [quizInformation]);

    // Kullanıcının cevapladığı soruları rapor sayfasında göstermek için kullanılır.
    // Bu objeye göre rapor sayfasında soruların doğru yanlış cevaplarını gösteriyoruz.
    useEffect(() => {
        if (userAnswer !== -1 && currentQuestionIndex < quizInformation.questions.length) {
            const updatedQuestions = [...quizReport.questions];
            updatedQuestions[currentQuestionIndex].userAnswer = userAnswer;
            setQuizReport((prevObject) => ({
                ...prevObject,
                questions: updatedQuestions,
            }));
        }

    }, [userAnswer, currentQuestionIndex]);

    // Her soru değiştiğinde kullanıcının verdiği cevap sıfırlanır.
    useEffect(() => {
        setUserAnswer(-1);
    }, [currentQuestionIndex])

    // Süre dolduğunda rapor sayfasına yönlendirilir.
    useEffect(() => {
        isTimerEnd && console.log("Süre Doldu");
    }, [isTimerEnd]);

    return (
        <>
            {(currentQuestionIndex === quizInformation.questions.length || showQuizReport) && (
                <QuizReport
                    startTime={startTime}
                    quizReport={quizReport}
                    quizQuestions={quizInformation.questions}
                    solveAgain={solveAgain}
                />
            )}
            {(currentQuestionIndex !== quizInformation.questions.length && !showQuizReport) && (
                <>
                    <QuizTimer
                        duration={quizInformation.duration}
                        setIsTimerEnd={setIsTimerEnd}
                        pauseTimer={pauseTimer}
                    />
                    <View style={styles.quizContainer}>
                        <TouchableOpacity style={styles.closeContainer}>
                            <Close width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{quizInformation.bookName}</Text>
                        <Text style={styles.quizHeaderText}>
                            {currentQuestionIndex + 1}) {quizInformation.questions[currentQuestionIndex].question}
                        </Text>
                        <View style={styles.answerContainer}>
                            {quizInformation.questions[currentQuestionIndex].answers.map((answer, index) => (
                                <AnswerButton
                                    key={index}
                                    index={index}
                                    answer={answer}
                                    userAnswer={userAnswer}
                                    quizReport={Object.keys(quizReport).length > 0 && quizReport.questions[currentQuestionIndex]}
                                    currentQuestionIndex={currentQuestionIndex}
                                    currentQuestionData={quizInformation.questions[currentQuestionIndex]}
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
        fontSize: Fonts.size(14),
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