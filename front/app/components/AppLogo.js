import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

function AppLogo({ font_size, first_color = colors.BLACK }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.first, { fontSize: font_size, color: first_color }]}>EUCL</Text>
            <Text style={[styles.last, { fontSize: font_size }]}>Electro</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    first: {
        fontWeight: 'bold'
    },
    last: {
        color: colors.PRIMARY,
        fontWeight: 'bold'
    }
});

export default AppLogo;