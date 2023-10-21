import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Timer } from '../../../../assets/svgs';
import { useLocalization } from '../../../../hooks/useLocalization';

import stylesLTR from '../../../styles/screens/Quiz/components/QuizTimer/ltr';
import stylesRTL from '../../../styles/screens/Quiz/components/QuizTimer/rtl';

const QuizTimer = ({ duration, setIsTimerEnd, pauseTimer }) => {

    const {language} = useSelector(state => state.locale);
    const styles = language === 'al' ? stylesRTL : stylesLTR;

    const strings = useLocalization();

    // State değeri ve zamanlayıcı süresi
    const [remainingTime, setRemainingTime] = useState(duration * 60); // 10 dakika (saniye cinsinden)
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