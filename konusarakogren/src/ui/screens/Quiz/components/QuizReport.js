import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useLocalization } from '../../../../hooks/useLocalization';

const QuizReport = (props) => {

    const { startTime, quizReport, solveAgain, quizQuestions } = props;
    const strings= useLocalization();

    return (
        <>
            <Text>Quiz Report</Text>
        </>
    );
};

const styles = StyleSheet.create({

});

export default QuizReport;