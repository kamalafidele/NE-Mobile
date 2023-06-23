import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

function Separator({ text }) {
    return (<View style={styles.container}></View>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 1,
        width: '100%',
        backgroundColor: colors.GRAY
    }
})
export default Separator;