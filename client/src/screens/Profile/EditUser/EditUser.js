import { useState, useEffect } from 'react';
import { Text, TextInput, Image, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

import styles from './EditUser.style';

import { COLORS, icons } from '../../../constants';

import httpRequest from '../../../utils/httpRequest';

function EditUser(props) {
    const { navigation } = props;
    const [image, setImage] = useState();
    const [userInfo, setUserInfo] = useState();
    const [username, setUsername] = useState();
    const [job, setJob] = useState();
    const [description, setDescription] = useState();
    const [isSaved, setIsSaved] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {
        getUser();
    }

    const getUser = async () => {
        try {
            const userStorage = await AsyncStorage.getItem("user");

            const user = JSON.parse(userStorage);

            setUserInfo(user);
            setImage(user?.avatar);
            setUsername(user?.username);
            setJob(user?.job);
            setDescription(user?.description);

        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const handleUsername = (text) => {
        setIsSaved(false);
        setUsername(text);
    }

    const handleJob = (text) => {
        setIsSaved(false);
        setJob(text);
    }

    const handleDescription = (text) => {
        setIsSaved(false);
        setDescription(text);
    }

    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!res.canceled) {
            let imageUri = res ? `data:image/jpg;base64,${res.assets[0].base64}` : null;

            setIsSaved(false);
            setImage(imageUri);
        }
    };

    const onSave = async () => {
        if (username.trim() !== '') {
            const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

            if (!format.test(username)) {
                try {
                    const tokenStorage = await AsyncStorage.getItem("token");

                    const token = JSON.parse(tokenStorage);

                    const res = await httpRequest.post("/users/update-profile",
                        {
                            avatar: image,
                            username,
                            job,
                            description
                        },
                        {
                            headers: { Authorization: `JWT ${token}` },
                        }
                    )

                    if (res.data.success) {
                        const user = res.data.profile;

                        await AsyncStorage.setItem("user", JSON.stringify(user));

                        Keyboard.dismiss();

                        setIsSaved(true);

                        Alert.alert("Thành công", "Thông tin cá nhân của bạn đã được thay đổi");
                    }

                } catch {
                    Alert.alert("", "Lỗi")
                }
            } else {
                Alert.alert("", "Tên đăng nhập không được chứa các ký tự đặc biệt");
            }
        } else {
            Alert.alert("", "Tên đăng nhập không được để trống");
        }
    }

    const onBack = () => {
        if (isSaved) {
            navigation.goBack()
        } else {
            Alert.alert(
                "Bạn có chắc rằng muốn rời khỏi",
                "Thông tin của bạn chưa được lưu. Bạn có muốn lưu lại thông tin trước khi rời khỏi?",
                [
                    {
                        text: 'Rời khỏi',
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: 'Ở lại',
                        style: 'cancel',
                    },
                ]
            )
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                        <icons.ICArrowLeft scale={1} color={COLORS.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                        <Text style={styles.saveText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                {userInfo &&
                    <View>
                        <TouchableOpacity style={styles.upload} onPress={pickImage}>
                            <Image
                                style={styles.avatar}
                                source={image ? { uri: image } : require('../../../assets/images/avatar.png')}
                            />
                            <Text style={styles.uploadText}>Tải ảnh lên</Text>
                        </TouchableOpacity>

                        <View style={styles.box}>
                            <Text style={styles.title}>Tên đăng nhập</Text>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.input}
                                value={username}
                                onChangeText={(text) => handleUsername(text)}
                            />
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.title}>Lĩnh vực</Text>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.input}
                                value={job}
                                onChangeText={(text) => handleJob(text)}
                            />
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.title}>Giới thiệu về bạn</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={6}
                                selectionColor={COLORS.primary}
                                style={styles.inputLarge}
                                value={description}
                                onChangeText={(text) => handleDescription(text)}
                            />
                        </View>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

export default EditUser;
