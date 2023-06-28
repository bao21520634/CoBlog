import { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from 'expo-image-picker';

import styles from './MoreInfo.style';

import { icons, COLORS } from '../../../constants';

import httpRequest from '../../../utils/httpRequest';

function MoreInfo(props) {
    const { navigation, route } = props;
    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [blogId, setBlogId] = useState();
    const [title, setTitle] = useState("");
    const [tagName, setTagName] = useState("");
    const [tagNameList, setTagNameList] = useState([]);

    useEffect(() => {
        if (route?.params) {
            setBlogId(route.params?.blogId);
            setContent(route.params?.content);
            setTitle(route.params?.title);
            setTagNameList(route.params?.tagNameList);
            setImage(route.params?.thumbnail);
        }
    }, []);

    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 1],
            quality: 1,
        });

        if (!res.canceled) {
            let imageUri = res ? `data:image/jpg;base64,${res.assets[0].base64}` : null;
            setImage(imageUri);
        }
    };

    const addTag = () => {
        const tag = tagName.toUpperCase().trim();

        if (tag !== '') {
            const tagList = [...tagNameList];

            console.log(tagList.length)

            if (tagList.length < 5) {
                if (!tagList.includes(tag)) {
                    tagList.push(tag);
                    setTagName("");
                }

                setTagNameList(tagList);
            } else {
                Alert.alert("", "Bạn chỉ thêm được tối đa là 5");

                setTagName("");
                Keyboard.dismiss();

            }
        }
    }

    const removeTag = (tagName) => {
        let tagList = [...tagNameList];

        tagList = tagList.filter(item => item !== tagName);

        setTagNameList(tagList);
    }

    const onSave = async () => {
        Keyboard.dismiss();
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (content !== '' && image && (title.trim().length > 0)) {
            try {
                const res = await httpRequest.post("/blogs/create-blog",
                    {
                        title,
                        thumbnail: image,
                        content,
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    const blogId = res.data.blog._id

                    for (var tag of tagNameList) {
                        httpRequest.post("/tags/create-tag",
                            {
                                name: tag,
                                blogId
                            },
                            {
                                headers: { Authorization: `JWT ${token}` },
                            }
                        )

                    }

                    setImage("");
                    setTitle("");
                    Keyboard.dismiss();

                    navigation.navigate("ContentUpload", { isSaved: true });
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        } else {
            Alert.alert("", "Thông tin cần đăng tải còn thiếu")
        }
    };

    const onUpdate = async () => {
        Keyboard.dismiss();
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (content !== '' && image && (title.trim().length > 0)) {
            try {
                const res = await httpRequest.post("/blogs/update-blog",
                    {
                        blogId,
                        title,
                        thumbnail: image,
                        content,
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    const blogId = res.data.blog._id

                    for (var tag of tagNameList) {
                        httpRequest.post("/tags/create-tag",
                            {
                                name: tag,
                                blogId
                            },
                            {
                                headers: { Authorization: `JWT ${token}` },
                            }
                        )

                    }

                    setImage("");
                    setTitle("");

                    navigation.navigate("ContentUpload", { isSaved: true });
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        } else {
            Alert.alert("", "Thông tin cần đăng tải còn thiếu")
        }

    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ backgroundColor: COLORS.lightWhite }}>
                <View style={styles.header}>
                    <View style={styles.headerWithoutStatusBar}>
                        <View style={styles.headerConfirmBtn}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                                <icons.ICArrowLeft scale={0.9} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.saveBtn} onPress={() => {
                            if (blogId) {
                                onUpdate();
                            } else {
                                onSave();
                            }
                        }
                        }>
                            <Text style={styles.saveText}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.titleText}>Tiêu đề *</Text>
                        <TextInput
                            selectionColor={COLORS.primary}
                            style={styles.titleInput}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>

                    <View style={styles.box}>
                        <View style={styles.tagInfo}>
                            <Text style={styles.titleText}>Chủ đề</Text>
                            <Text>{` (tối đa 5)`}</Text>
                        </View>
                        <View style={styles.tagCard}>
                            <TextInput
                                selectionColor={COLORS.primary}
                                style={styles.tagInput}
                                value={tagName}
                                onChangeText={(text) => setTagName(text)}
                            />

                            <TouchableOpacity style={styles.addTag} onPress={addTag}>
                                <icons.ICPlus scale={1.4} color={COLORS.gray} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tagNameList}>
                            {tagNameList.map((tagName, i) => (
                                <View key={i} style={styles.tag}>
                                    <Text style={styles.tagName}>{tagName}</Text>

                                    <TouchableOpacity style={styles.removeIcon} onPress={() => removeTag(tagName)}>
                                        <icons.ICRemove scale={0.6} color={COLORS.black} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                    </View>

                    <View style={styles.box}>
                        <Text style={styles.titleText}>Thumbnail *</Text>
                        <TouchableOpacity style={styles.thumbnailBtn} onPress={() => pickImage()}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.imageUploaded} />
                            ) : (
                                <Text style={{ color: COLORS.gray }}>Nhấn vào để tải ảnh lên</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default MoreInfo;
