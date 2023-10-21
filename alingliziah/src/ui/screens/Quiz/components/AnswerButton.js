import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../../theme/Colors";
import { getAnswerTitleByIndex } from "../../../../utils/utility";

import stylesLTR from '../../../styles/screens/Quiz/components/AnswerButton/ltr';
import stylesRTL from '../../../styles/screens/Quiz/components/AnswerButton/rtl';

const AnswerButton = (props) => {

    const { answer, onPress, index, userAnswer, isClickedControlButton, currentQuestionData, quizReport } = props;

    // const {language} = useSelector(state => state.locale);
    const language = 'al';
    const styles = language === 'al' ? stylesRTL : stylesLTR;

    // Kullanıcının hiçbir akisyon almadığı (cevap seçmediği) butonun koşuludur.
    let normalButton = userAnswer !== answer.id;
    // Kullancının cevap seçtiğinde gördüğü butonun koşuludur.
    let focusedButton = !isClickedControlButton && userAnswer === answer.id;
    // Kullanıcının cevap seçtikten sonra 'Kontrol Et' butonuna tıkladığında gördüğü doğru cevap butonun koşuludur.
    let rightAnswerButton = isClickedControlButton && currentQuestionData.rightAnswer === answer.id;
    // Kullanıcının cevap seçtikten sonra 'Kontrol Et' butonuna tıkladığında gördüğü yanlış cevap butonun koşuludur.
    let wrongAnswerButton = quizReport && isClickedControlButton && answer.id === quizReport.userAnswer && quizReport.userAnswer !== currentQuestionData.rightAnswer;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.answersContainer,
            {
                backgroundColor: focusedButton
                    ? colors.SOFT_PINK
                    : rightAnswerButton
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
        </TouchableOpacity>
    );
};

export default AnswerButton;