import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../../theme/Colors";
import Fonts from "../../../../theme/Fonts";
import { units } from "../../../../theme/Units";
import { getAnswerTitleByIndex } from "../../../../utils/utility";

const AnswerButton = (props) => {

    const { answer, onPress, index, userAnswer, isClickedControlButton, currentQuestionData, quizReport } = props;

    // Kullanıcının hiçbir akisyon almadığı (cevap seçmediği) butonun koşuludur.
    let normalButton = userAnswer !== answer.id;
    // Kullancının cevap seçtiğinde gördüğü butonun koşuludur.
    let focusedButton = !isClickedControlButton && userAnswer === answer.id;
    // Kullanıcının cevap seçtikten sonra 'Kontrol Et' butonuna tıkladığında gördüğü doğru cevap butonun koşuludur.
    let rightAnswerButton = isClickedControlButton && answer.id === currentQuestionData.rightAnswer;
    // Kullanıcının cevap seçtikten sonra 'Kontrol Et' butonuna tıkladığında gördüğü yanlış cevap butonun koşuludur.
    let wrongAnswerButton = quizReport && isClickedControlButton && answer.id === quizReport.userAnswer && quizReport.userAnswer !== currentQuestionData.rightAnswer;

    console.log("normalButton: " + normalButton + " focusedButton: " + focusedButton + " rightAnswerButton: " + rightAnswerButton + " wrongAnswerButton: " + wrongAnswerButton)
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.answersContainer,
            {
                backgroundColor: normalButton
                    ? colors.WHITE
                    : focusedButton
                        ? colors.LT_BLUE
                        : rightAnswerButton
                            ? colors.QUIZ_GREEN
                            : wrongAnswerButton
                                ? colors.MD_RED
                                : colors.WHITE,
            }
            ]}
        >
            <View style={styles.answer}>
                <View style={styles.answerIcon}>
                    <Text style={styles.answerChoice}>{getAnswerTitleByIndex(index)}</Text>
                </View>
                <Text style={styles.answerText}>{answer.answer}</Text>
            </View>
            {/* {answer == 1 ? (
                <Check
                    style={styles.check}
                    width={units.width / 25}
                    height={units.width / 25}
                />
            ) : null} */}
        </TouchableOpacity>
    );
};

export default AnswerButton;

const styles = StyleSheet.create({
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
