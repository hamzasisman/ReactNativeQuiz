import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BookPreview } from '../../../assets/svgs';
import { units } from '../../../theme/Units';

function BookPreviewButton() {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <BookPreview width={24} height={24} />
        </TouchableOpacity>
    );
}

export default BookPreviewButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginRight: units.width / 24,
    },
});
