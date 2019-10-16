import { StyleSheet } from 'react-native';

const iconTextSize = 80;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'forestgreen',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    square: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        width: 100,
        height: 100,
    },
    row: {
        flexDirection: 'row'
    },
    x: {
        fontSize: iconTextSize,
        color: 'red'
    },
    xL: {
        fontSize: iconTextSize,
        fontWeight: 'bold',
        color: 'red'
    },
    o: {
        fontSize: iconTextSize,
        color: 'blue'
    },
    oL: {
        fontSize: iconTextSize,
        fontWeight: 'bold',
        color: 'blue'
    },
    scores: {
        alignItems: 'center'
    },
    score: {
        fontSize: iconTextSize,
    },
    scoreMargin: {
        marginLeft: 20
    },
    endGameText: {
        fontSize: 20
    }
});

const cellBorders = [
    [{ borderLeftWidth: 0, borderTopWidth: 0 }, { borderTopWidth: 0 }, { borderRightWidth: 0, borderTopWidth: 0 }],
    [{ borderLeftWidth: 0 }, 0, { borderRightWidth: 0 }],
    [{ borderLeftWidth: 0, borderBottomWidth: 0 }, { borderBottomWidth: 0 }, { borderRightWidth: 0, borderBottomWidth: 0 }]
];

export { styles, cellBorders }