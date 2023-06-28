import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import styles from './ChangePassword.style';

import { icons, COLORS } from '../../../constants';

import httpRequest from '../../../utils/httpRequest';

function ChangePassword(props) {
    const { route, navigation } = props;


    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [seePassword, setSeePassword] = useState(true);
    const [seeCurrentPassword, setSeeCurrentPassword] = useState(true);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);
    const [checkValidPassword, setCheckValidPassword] = useState(true);
    const [checkValidConfirmPassword, setCheckValidConfirmPassword] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
        setSeePassword(true);
        setSeeConfirmPassword(true);
        setCheckValidPassword(true);
        setCheckValidConfirmPassword(true);
    }

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

    const onConfirm = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (route?.params) {
            if (route.params?.previousScreen && route.params.previousScreen === 'Profile') {
                const res = await httpRequest.post("/users/change-password",
                    {
                        currentPassword: currentPassword,
                        newPassword: password,
                        confirmNewPassword: confirmPassword
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                    setCurrentPassword("");
                    setPassword("");
                    setConfirmPassword("");
                    setSeeCurrentPassword(true);
                    setSeePassword(true);
                    setSeeConfirmPassword(true);

                    Keyboard.dismiss();

                    Alert.alert("Thành công", "Bạn đã đổi mật khẩu thành công");
                }
            } else {
                const res = await httpRequest.post("/users/forgot-password",
                    {
                        password,
                        confirmPassword
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                    navigation.navigate("Signin");
                }
            }
        } else {
            const res = await httpRequest.post("/users/forgot-password",
                {
                    password,
                    confirmPassword
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (res.data.success) {
                await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

                navigation.navigate("Signin");
            }
        }
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    {route.params?.previousScreen && route.params.previousScreen === 'Profile' && (
                        <View>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <icons.ICArrowLeft scale={1} color={COLORS.black} />
                            </TouchableOpacity>
                            <Text style={[styles.title, { marginTop: 64 }]}>{'Đổi mật khẩu'}</Text>
                        </View>
                    )}

                    {!route?.params && <Text style={styles.title}>{'Đổi mật khẩu'}</Text>}

                    {route.params?.previousScreen && route.params.previousScreen === 'Profile' && (
                        <View>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    selectionColor={COLORS.primary}
                                    secureTextEntry={seeCurrentPassword}
                                    value={currentPassword}
                                    onChangeText={(text) => setCurrentPassword(text)}
                                />
                                <TouchableOpacity style={styles.eyeIcon} onPress={() => setSeeCurrentPassword(!seeCurrentPassword)}>
                                    {seeCurrentPassword ? <icons.ICEye scale={0.8} color={COLORS.gray} /> : <icons.ICEyeClose scale={0.8} color={COLORS.gray} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}


                    <View style={styles.input}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nhập mật khẩu mới"
                            selectionColor={COLORS.primary}
                            secureTextEntry={seePassword}
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
                            style={styles.textInput}
                            placeholder="Nhập lại mật khẩu mới"
                            selectionColor={COLORS.primary}
                            secureTextEntry={seeConfirmPassword}
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

                    <TouchableOpacity style={styles.button} onPress={() => onConfirm()}>
                        <Text style={styles.titleBtn}>{'Xác nhận'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default ChangePassword;
