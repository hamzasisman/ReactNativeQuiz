import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Timer } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';
import { colors } from '../../../../theme/Colors';
import Fonts from '../../../../theme/Fonts';
import { units } from '../../../../theme/Units';

const QuizTimer = ({ duration, setIsTimerEnd, pauseTimer }) => {
    const strings = useLocalization();

    // State değeri ve zamanlayıcı süresi
    const [remainingTime, setRemainingTime] = useState(duration); // 10 dakika (saniye cinsinden)
    // Zamanlayıcı işlemi
    useEffect(() => {
        const timer = setInterval(() => {
            // Eğer pauseTimer true ise zamanlayıcıyı durdur
            if (pauseTimer) {
                clearInterval(timer);
            } else {
                // Kalan süreyi bir saniye azalt
                setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
            }
        }, 1000); // Her saniye güncelle

        // Kalan süre 0 olduğunda veya daha az olduğunda zamanlayıcıyı temizle
        if (remainingTime <= 0) {
            clearInterval(timer);
            setIsTimerEnd(true);
        }

        // Komponent unmount edildiğinde zamanlayıcıyı temizle
        return () => clearInterval(timer);
    }, [remainingTime, pauseTimer]);

    return (
        <View style={styles.headerContainer}>
            <Timer width={30} height={30} />
            <Text style={styles.headerText}>{strings.quiz.remaining_time}:</Text>
            <Text style={styles.remainingTime}>
                {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
            </Text>
        </View>
    );
};

export default QuizTimer;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.DROPDOWN_PINK,
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
    remainingTime: {
        fontFamily: Fonts.type.bold,
        color: colors.BLUE,
    }
});