import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native'

const LoadingIndicator = (props) => {
    const {
        loading,
        animationType = 'fade',
        indicatorColor = '#BF2F1A',
        loadingText = 'Loading...',
    } = props

    return (
        <Modal transparent animationType={animationType} visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator color={indicatorColor} animating={loading} size="large" />
                    <Text style={styles.loadingText}>
                        {loadingText}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#fff',
        height: 90,
        width: 90,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loadingText:
    {
        fontSize: 14,
        color: '#BF2F1A'
    }
})
