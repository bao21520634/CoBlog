import { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, Text, Keyboard, TextInput, View, Image, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import { icons, COLORS } from '../../../constants';

import styles from './Signin.style';

import httpRequest from '../../../utils/httpRequest';

function Signin(props) {
    const { navigation } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {
        setEmail('');
        setPassword('');
        setSeePassword(true);
        setCheckValidEmail(true);
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

    const signin = async () => {
        Keyboard.dismiss();

        if (checkValidEmail) {
            try {
                const res = await httpRequest.post("/users/signin", {
                    email,
                    password,
                });

                if (res.data.success) {
                    await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
                    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                    navigation.navigate("Layout");
                }
            } catch {
                Alert.alert("", "Bạn cần xác nhận lại thông tin đăng nhập")
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
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSeePassword(!seePassword)}>
                            {seePassword ? <icons.ICEye scale={0.8} color={COLORS.gray} /> : <icons.ICEyeClose scale={0.8} color={COLORS.gray} />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ForgotPassword');
                        }}
                        style={styles.forgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>{'Quên mật khẩu'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.signinBtn]}
                        onPress={() => signin()}
                    >
                        <Text style={styles.signinText}>{'Đăng nhập'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                        style={[styles.button, styles.signupBtn]}
                    >
                        <Text style={styles.signupText}>{'Đăng ký'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Signin;
