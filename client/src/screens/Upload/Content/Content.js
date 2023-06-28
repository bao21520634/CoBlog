import { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useIsFocused } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import styles from './Content.style';

import { icons, COLORS } from '../../../constants';

function Content(props) {
    const { navigation, route } = props;

    const isFocused = useIsFocused();
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    const [descHTML, setDescHTML] = useState('');
    const [showDescError, setShowDescError] = useState(false);
    const [title, setTitle] = useState();
    const [blogId, setBlogId] = useState();
    const [tagNameList, setTagNameList] = useState();
    const [thumbnail, setThumbnail] = useState();


    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const richText = useRef();

    const updateFunction = () => {
        if (route?.params) {
            if (route.params?.isSaved) {
                richText.current.setContentHTML('');
            }

            if (route.params?.blogId) {
                richText.current.setContentHTML(route.params?.content);
                setDescHTML(route.params?.content);
                setBlogId(route.params?.blogId);
                setTitle(route.params?.title);
                setTagNameList(route.params?.tagNameList);
                setThumbnail(route.params?.thumbnail);
            }
        }
    }

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            const keyboardHeight = e.endCoordinates.height;

            styles.richTextContainer = {
                backgroundColor: COLORS.white,
                width: '100%',
                height: Dimensions.get('window').height - 56 * 2 - keyboardHeight,
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 4,
            };

            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            styles.richTextContainer = {
                backgroundColor: COLORS.white,
                width: '100%',
                height: Dimensions.get('window').height - 56 * 2,
                borderWidth: 1,
                borderColor: COLORS.gray,
                borderRadius: 4,
            };

            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
            setShowDescError(false);
            setDescHTML(descriptionText);
        } else {
            setShowDescError(true);
            setDescHTML('');
        }
    };

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
            richText.current.insertImage(imageUri);
        }
    };

    const onNext = () => {
        const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
        const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();

        if (replaceWhiteSpace.length > 0) {
            navigation.navigate('MoreInfoUpload', { content: descHTML, title, blogId, tagNameList, thumbnail });
        } else {
            navigation.navigate('MoreInfoUpload', { content: '' });
        }
    };

    return (
        <View style={{ backgroundColor: COLORS.lightWhite }}>
            <View style={styles.header}>
                <View style={styles.headerWithoutStatusBar}>
                    <Text style={styles.headerTitle}>Đăng tải</Text>

                    <View style={styles.headerConfirmBtn}>
                        {isKeyboardVisible ? (
                            <TouchableOpacity
                                style={styles.headerConfirmBtn}
                                onPress={() => richText.current?.dismissKeyboard()}
                            >
                                <icons.ICCheck scale={1.4} color={COLORS.black} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.headerConfirmBtn} onPress={onNext}>
                                <Text style={styles.nextText}>Tiếp</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.richTextContainer}>
                    <RichToolbar
                        editor={richText}
                        selectedIconTint={COLORS.primary}
                        iconTint={COLORS.black}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.indent,
                            actions.outdent,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.alignFull,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertImage,
                            actions.insertLink,
                            actions.setStrikethrough,
                            actions.code,
                            actions.undo,
                            actions.redo,
                        ]}
                        onPressAddImage={() => {
                            pickImage();
                        }}
                        style={styles.richTextToolbar}
                    />
                    <ScrollView>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ flex: 1 }}
                        >
                            <RichEditor
                                ref={richText}
                                onChange={richTextHandle}
                                editorStyle={styles.richTextEditor}
                                initialHeight={Dimensions.get('window').height - 56 * 2 - 48}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Content;
