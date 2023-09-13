import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const BottomModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                        {/* Your modal content goes here */}
                        <Text style={{ alignSelf: 'center', marginVertical: 10 }}>
                            Add Profile
                        </Text>
                        <Text style={{ alignSelf: 'center', width: '95%', textAlign: 'center' }}>Complete your profile to showcase your unique personality. Replace your photo with a video for a more dynamic representation of yourself.

                        </Text>
                        {/* <Image
                            style={{
                                alignSelf: 'center',
                                height: '60%',
                                width: 320,
                                marginVertical: 30,
                            }}
                            resizeMode='contain'
                            source={require("./src/assets/image_prompt.png")}
                        /> */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ height: '8%', width: '60%', backgroundColor: '#6EDC18', alignSelf: 'center', borderRadius: 28 }}
                        >


                        </TouchableOpacity>

                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b608a'

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        height: '70%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        alignContent: 'center',
    },
});



