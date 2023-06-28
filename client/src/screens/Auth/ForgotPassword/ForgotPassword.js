import { useState, useEffect } from 'react';
import { Alert, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import styles from './ForgotPassword.style';

import { icons, COLORS } from '../../../constants';

import httpRequest from '../../../utils/httpRequest';

function ForgotPassword(props) {
    const { navigation } = props;

    const [email, setEmail] = useState("");
    const [checkValidEmail, setCheckValidEmail] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const onBack = () => {
        navigation.goBack();
    };

    const updateFunction = () => {
        setEmail('');
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

    const confirm = async () => {
        if (checkValidEmail) {
            try {
                const res = await httpRequest.post("/users/sendmail-forgot-password", {
                    email
                });

                if (res.data.success) {
                    await AsyncStorage.setItem("token", JSON.stringify(res.data.token));

                    navigation.navigate('Verification', { previousScreen: 'ForgotPassword' });
                }
            } catch {
                Alert.alert("", "Email không tồn tại")
            }

        } else {
            Alert.alert("", "Vui lòng nhập lại email")
        }
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                        <icons.ICArrowLeft scale={1} color={COLORS.black} />
                    </TouchableOpacity>

                    <Text style={styles.title}>{'Quên mật khẩu'}</Text>
                    <Text style={styles.description}>{'Vui lòng nhập địa chỉ email của bạn'}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email của bạn"
                        selectionColor={COLORS.primary}
                        value={email}
                        onChangeText={(text) => handleCheckEmail(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={confirm}>
                        <Text style={styles.titleBtn}>{'Gửi'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default ForgotPassword;
