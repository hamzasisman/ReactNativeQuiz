import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useLocalization } from '../../../../hooks/useLocalization';

const QuizList = ({ books, setSelectedQuiz }) => {
    const strings = useLocalization();

    return (
        <GestureHandlerRootView>
            
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    
});

export default QuizList;