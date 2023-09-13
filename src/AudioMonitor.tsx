import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Path } from 'react-native-svg';


export const AudioMonitor = () => {
    const { width, height } = Dimensions.get('window');

    const [currentTime, setCurrentTime] = useState(0.0);
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [stoppedRecording, setStoppedRecording] = useState(false);
    const [decibels, setDecibels] = useState(0)
    const [currentMetering, setCurrentMetering] = useState(-54.88); // Initialize with a default value
    const [data, setData] = useState<any>()
    const [finished, setFinished] = useState(false);
    const [audioPath, setAudioPath] = useState(
        AudioUtils.DocumentDirectoryPath + '/test.aac'
    );
    const [hasPermission, setHasPermission] = useState(undefined);

    let path: any;
    useEffect(() => {
        const prepareRecordingPath = (audioPath: any) => {
            AudioRecorder.prepareRecordingAtPath(audioPath, {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: 'Low',
                AudioEncoding: 'aac',
                AudioEncodingBitRate: 32000,
                MeteringEnabled: true
            });
        };

        const requestAudioPermission = async () => {
            const isAuthorized: any = await AudioRecorder.requestAuthorization();
            setHasPermission(isAuthorized);
            if (!isAuthorized) return;
            prepareRecordingPath(audioPath);
            AudioRecorder.onProgress = (data: any) => {









                console.log(data)
                setData(data)
                // if (!Array.isArray(data) || data.length === 0) {
                // setData(data);
                function convertToPositiveDB(valueInDBFS: any) {
                    return -valueInDBFS;
                }
                const loudnessCurrentMetering = convertToPositiveDB(data?.currentMetering);

                const loudnessCurrentPeakMetering = convertToPositiveDB(data?.currentPeakMetering);

                console.log("Loudness from currentMetering:", loudnessCurrentMetering.toFixed(2), "dB");
                console.log("Loudness from currentPeakMetering:", loudnessCurrentPeakMetering.toFixed(2), "dB");
                // );
                let db: any = data.currentMetering




                setDecibels(loudnessCurrentMetering)
                setCurrentMetering(db)
                setCurrentTime(Math.floor(data.currentTime));
            };

            AudioRecorder.onFinished = (data: any) => {
                if (Platform.OS === 'ios') {
                    finishRecording(data.status === 'OK', data.audioFileURL, data?.audioFileSize);
                }
            };
        };

        requestAudioPermission();

    }, []);


    const finishRecording = (didSucceed: any, filePath: any, fileSize: any) => {
        setFinished(didSucceed);
        console.log(
            `Finished recording of duration ${currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`
        );
    };
    const renderButton = (title: any, onPress: any, active: any) => {
        const style = active ? styles.activeButtonText : styles.buttonText;
        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={style}>{title}</Text>
            </TouchableOpacity>
        );
    };
    const renderPauseButton = (onPress: any, active: any) => {
        const style = active ? styles.activeButtonText : styles.buttonText;
        const title = paused ? 'RESUME' : 'PAUSE';
        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={style}>{title}</Text>
            </TouchableOpacity>
        );
    };
    const pause = async () => {
        if (!recording) {
            console.warn("Can't pause, not recording!");
            return;
        }

        try {
            await AudioRecorder.pauseRecording();
            setPaused(true);
        } catch (error) {
            console.error(error);
        }
    };
    const resume = async () => {
        if (!paused) {
            console.warn("Can't resume, not paused!");
            return;
        }

        try {
            await AudioRecorder.resumeRecording();
            setPaused(false);
        } catch (error) {
            console.error(error);
        }
    };
    const stop = async () => {
        if (!recording) {
            console.warn("Can't stop, not recording!");
            return;
        }

        setStoppedRecording(true);
        setRecording(false);
        setPaused(false);

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                finishRecording(true, filePath, 10);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    };
    const record = async () => {
        if (recording) {
            console.warn('Already recording!');
            return;
        }

        if (!hasPermission) {
            console.warn("Can't record, no permission granted!");
            return;
        }

        // if (stoppedRecording) {
        //     prepareRecordingPath(audioPath);
        // }

        setRecording(true);
        setPaused(false);

        try {
            await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    };

    const AudioVisualization = ({ audioData }) => {
        if (!Array.isArray(audioData) || audioData.length === 0) {
            // Handle the case where audioData is not valid
            return (
                <View>
                    {/* You can display a placeholder or error message here */}
                    <Text>No audio data available</Text>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                {renderButton('RECORD', record, recording)}
                {renderButton('STOP', stop, 'yes')}
                {renderPauseButton(paused ? resume : pause, paused)}
                <Text style={styles.progressText}>{currentTime}s</Text>
                <Text style={styles.progressText}>{decibels.toFixed(1)} dB</Text>
                <AudioVisualization audioData={data} />

                <Svg width={width} height={50}>
                    <Path d={path} fill="none" stroke="blue" strokeWidth="2" />
                </Svg>



            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b608a',
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50

    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: '#fff',
    },
    button: {
        padding: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    activeButtonText: {
        fontSize: 20,
        color: '#B81F00',
    }, chart: {
        height: '100%',
    },
    bar: {
        backgroundColor: '#00ff00', // Adjust the color as needed
        width: '100%', // Adjust the width as needed
    },
});

