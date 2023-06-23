import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function AppButton({ title, onPress, color = colors.PRIMARY, width = '100%' }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: color, width: width }]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginVertical: 10
    },
    text: {
        color: colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default AppButton;