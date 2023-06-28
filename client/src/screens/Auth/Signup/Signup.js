import { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Text, Keyboard, TextInput, View, Image, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import { icons, COLORS } from '../../../constants';

import styles from './Signup.style';

import httpRequest from '../../../utils/httpRequest';

function Signup(props) {
    const { navigation } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [seePassword, setSeePassword] = useState(true);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(true);
    const [checkValidPassword, setCheckValidPassword] = useState(true);
    const [checkValidConfirmPassword, setCheckValidConfirmPassword] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSeePassword(true);
        setSeeConfirmPassword(true);
        setCheckValidEmail(true);
        setCheckValidPassword(true);
        setCheckValidConfirmPassword(true);
    }

    const handleCheckEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(true);
        } else {
            setCheckValidEmail(false);
        }
    };

    const handleCheckPassword = (text) => {
        setPassword(text);
        if (text.length >= 8) {
            setCheckValidPassword(true);
        } else {
            setCheckValidPassword(false);
        }
    };

    const handleCheckConfirmPassword = (text) => {
        setConfirmPassword(text);
        if (text === password) {
            setCheckValidConfirmPassword(true);
        } else {
            setCheckValidConfirmPassword(false);
        }
    };

    const signup = async () => {
        Keyboard.dismiss();

        if (checkValidEmail && (password === confirmPassword)) {
            try {
                const res = await httpRequest.post("/users/signup", {
                    email,
                    password,
                    confirmPassword,
                });

                if (res.data.success) {
                    await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
                    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                    navigation.navigate("Verification");
                }
            } catch {
                Alert.alert("", "Bạn cần xác nhận lại thông tin đăng ký")
            }
        }
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Image source={icons.logo} style={styles.image} />

                    <View style={styles.input}>
                        <TextInput
                            selectionColor={COLORS.primary}
                            placeholder="Nhập email của bạn"
                            style={[styles.textInput, { marginTop: 48 }]}
                            value={email}
                            onChangeText={(text) => handleCheckEmail(text)}
                        />
                    </View>
                    {!checkValidEmail ? (
                        <Text style={styles.failText}>{"Lỗi định dạng email!"}</Text>
                    ) : (
                        <></>
                    )}

                    <View style={styles.input}>
                        <TextInput
                            secureTextEntry={seePassword}
                            selectionColor={COLORS.primary}
                            placeholder="Nhập mật khẩu"
                            style={styles.textInput}
                            value={password}
                            onChangeText={(text) => handleCheckPassword(text)}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSeePassword(!seePassword)}>
                            {seePassword ? <icons.ICEye scale={0.8} color={COLORS.gray} /> : <icons.ICEyeClose scale={0.8} color={COLORS.gray} />}
                        </TouchableOpacity>
                    </View>
                    {
                        !checkValidPassword ? (
                            <Text style={styles.failText}>{"Mật khẩu phải hơn 8 ký tự"}</Text>
                        ) : (
                            <></>
                        )
                    }

                    <View style={styles.input}>
                        <TextInput
                            secureTextEntry={seeConfirmPassword}
                            selectionColor={COLORS.primary}
                            placeholder="Nhập lại mật khẩu"
                            style={styles.textInput}
                            value={confirmPassword}
                            onChangeText={(text) => handleCheckConfirmPassword(text)}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSeeConfirmPassword(!seeConfirmPassword)}>
                            {seeConfirmPassword ? <icons.ICEye scale={0.8} color={COLORS.gray} /> : <icons.ICEyeClose scale={0.8} color={COLORS.gray} />}
                        </TouchableOpacity>
                    </View>
                    {
                        !checkValidConfirmPassword ? (
                            <Text style={styles.failText}>{"Mật khẩu xác nhận chưa khớp"}</Text>
                        ) : (
                            <></>
                        )
                    }

                    <TouchableOpacity
                        style={[styles.button, styles.signupBtn]}
                        onPress={() => signup()}
                    >
                        <Text style={styles.signupText}>{'Đăng ký'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Signin');
                        }}
                        style={[styles.button, styles.signinBtn]}
                    >
                        <Text style={styles.signinText}>{'Đăng nhập'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Signup;
