import { useRef, useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import { icons, COLORS } from '../../../constants';

import styles from './Verification.style';

import httpRequest from '../../../utils/httpRequest';

function Verification(props) {
    const { route, navigation } = props;

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [code, setCode] = useState({ 1: '', 2: '', 3: '', 4: '' });

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {
        firstInput.current.reset();
        secondInput.current.reset();
        thirdInput.current.reset();
        fourthInput.current.reset();
        setCode({ 1: '', 2: '', 3: '', 4: '' });
    }

    const otp = Object.values(code).reduce((temp, val) => temp + val, '');


    const onConfirm = async () => {
        if (otp.length === 4) {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            try {
                const res = await httpRequest.post("/users/verify-email",
                    {
                        otp,
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                );

                if (res.data.success) {
                    if (route?.params) {
                        if (route.params.previousScreen === 'ForgotPassword') navigation.navigate('ChangePassword')
                        else
                            navigation.navigate("Layout")
                    } else {
                        navigation.navigate("Layout")
                    }

                }
            } catch {
                Alert.alert("", "Sai mã OTP")
            }
        }
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleHead}>{'Xác thực Email'}</Text>
                        <Text style={styles.description}>
                            {
                                'Chúng tôi vừa gửi mã xác thực đến email của bạn. Vui lòng kiểm tra và nhập mã vào các ô dưới đây.'
                            }
                        </Text>
                        {/* {params?.previousScreen ? <Text style={styles.description}>d</Text> : ''} */}
                    </View>

                    <View style={styles.codeContainer}>
                        <View style={styles.input}>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.codeText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={firstInput}
                                onChangeText={(text) => {
                                    setCode({ ...code, 1: text });
                                    text && secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.codeText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={secondInput}
                                onChangeText={(text) => {
                                    setCode({ ...code, 2: text });
                                    text ? thirdInput.current.focus() : firstInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.codeText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={thirdInput}
                                onChangeText={(text) => {
                                    setCode({ ...code, 3: text });
                                    text ? fourthInput.current.focus() : secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.codeText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={fourthInput}
                                onChangeText={(text) => {
                                    setCode({ ...code, 4: text });
                                    !text && thirdInput.current.focus();
                                }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.checkBtn} onPress={onConfirm}>
                        <icons.ICCheck scale={1.5} color="#fff" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Verification;
