import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import styles from './Profile.style';

import { COLORS, SIZES, icons } from '../../constants';

import Card from '../../components/Card';
import Tag from "../../components/Tag"

import httpRequest from '../../utils/httpRequest';

function Profile(props) {
    const { navigation, route } = props;

    const [userCard, setUserCard] = useState();
    const [isDefaultUser, setIsDefaultUser] = useState(route?.params?.userId ? false : true);
    const [isBlockUser, setIsBlockUser] = useState(false);
    const [isDisplayFollow, setIsDisplayFollow] = useState(false);
    const [blogCardList, setBlogCardList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [data, setData] = useState([])

    const [tagActivated, setTagActivated] = useState('userInfo');

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    useEffect(() => {
        handleDisplay();
    }, [userCard])

    const updateFunction = () => {
        getUser();

        if (isDefaultUser) {
            getDefaultBlogList();
        }
    }

    const getUser = async () => {
        setRefreshing(true);

        try {
            const tokenStorage = await AsyncStorage.getItem("token");
            const userStorage = await AsyncStorage.getItem("user");

            const token = JSON.parse(tokenStorage);
            const user = JSON.parse(userStorage);

            let userId = user._id;

            if (route?.params) {
                styles.container = {
                    height: Dimensions.get('window').height - 56 - 20,
                };

                userId = route.params?.userId;
            } else {
                styles.container = {
                    height: Dimensions.get('window').height - 56 * 2,
                };

                setTagActivated('userBlog')
            }

            const userRes = await httpRequest.post("/users/get-profile",
                {
                    authorId: userId
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (userRes.data.success) {
                const userFromFetchApi = userRes.data.profile;

                if (userFromFetchApi?.status) {
                    setUserCard(prevState => ({ ...prevState, ...userFromFetchApi }));
                } else {
                    setUserCard(prevState => ({ ...prevState, ...userFromFetchApi, status: 0 }));
                }

                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const getDefaultBlogList = async () => {
        setRefreshing(true);

        try {
            const tokenStorage = await AsyncStorage.getItem("token");

            const token = JSON.parse(tokenStorage);

            const blogsRes = await httpRequest.post("/blogs/get-user-blog",
                {},
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (blogsRes.data.success) {
                const blogListFromFetchApi = blogsRes.data.userBlogList;

                const cardList = [];

                for (var blog of blogListFromFetchApi) {
                    const card = { ...blog };
                    const blogListCreatedDate = new Date(blog.createdAt);

                    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    const today = new Date();
                    const diffDays = Math.round(Math.abs((today - blogListCreatedDate) / oneDay));

                    if (diffDays === 0) {
                        const time = Math.round(Math.abs((today - blogListCreatedDate) / 1000)); // 1s = 1000ms

                        if (time >= (60 * 60)) {
                            card.createdDate = `${Math.round(time / (60 * 60))} tiếng trước`;
                        } else if (time >= 60) {
                            card.createdDate = `${Math.round(time / 60)} phút trước`;
                        } else {
                            card.createdDate = `${time} giây trước`;
                        }
                    } else if (diffDays < 7) {
                        card.createdDate = `${Math.round(diffDays)} ngày trước`;
                    } else if (diffDays < (4 * 7)) { // < 1 month
                        card.createdDate = `${Math.round(diffDays / 7)} tuần trước`;
                    } else if (diffDays < (4 * 7 * 12)) { // < 1 year
                        card.createdDate = `${Math.round(diffDays / (4 * 7))} tháng trước`;
                    } else {
                        card.createdDate = `${blogListCreatedDate.toISOString().substring(0, 10)}`;
                    }

                    cardList.push(card);
                }

                setBlogCardList(cardList);
                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const getUserBlogList = async () => {
        setRefreshing(true);

        try {
            const tokenStorage = await AsyncStorage.getItem("token");

            const token = JSON.parse(tokenStorage);

            const blogsRes = await httpRequest.post("/blogs/get-author-blog",
                {
                    authorId: route.params.userId
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (blogsRes.data.success) {
                const blogListFromFetchApi = blogsRes.data.userBlogList;

                const cardList = [];

                for (var blog of blogListFromFetchApi) {
                    const card = { ...blog };
                    const blogListCreatedDate = new Date(blog.createdAt);

                    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    const today = new Date();
                    const diffDays = Math.round(Math.abs((today - blogListCreatedDate) / oneDay));

                    if (diffDays === 0) {
                        const time = Math.round(Math.abs((today - blogListCreatedDate) / 1000)); // 1s = 1000ms

                        if (time >= (60 * 60)) {
                            card.createdDate = `${Math.round(time / (60 * 60))} tiếng trước`;
                        } else if (time >= 60) {
                            card.createdDate = `${Math.round(time / 60)} phút trước`;
                        } else {
                            card.createdDate = `${time} giây trước`;
                        }
                    } else if (diffDays < 7) {
                        card.createdDate = `${Math.round(diffDays)} ngày trước`;
                    } else if (diffDays < (4 * 7)) { // < 1 month
                        card.createdDate = `${Math.round(diffDays / 7)} tuần trước`;
                    } else if (diffDays < (4 * 7 * 12)) { // < 1 year
                        card.createdDate = `${Math.round(diffDays / (4 * 7))} tháng trước`;
                    } else {
                        card.createdDate = `${blogListCreatedDate.toISOString().substring(0, 10)}`;
                    }

                    cardList.push(card);
                }

                setBlogCardList(cardList);
                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const logout = async () => {
        await AsyncStorage.clear();

        navigation.navigate("Signin")
    }

    const onFollow = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/users/follow-user",
                    {
                        followerId: userCard._id
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getUser();
                    setIsDisplayFollow(true);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const onUnfollow = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/users/unfollow-user",
                    {
                        followerId: userCard._id
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getUser();
                    setIsDisplayFollow(false);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const onPressBlog = async ({ blogId, userId }) => {
        const res = await httpRequest.post("/blogs/view-blog",
            {
                blogId
            }
        )

        if (res.data.success)
            navigation.navigate("Blog", { blogId, userId })
    }

    const handleUserInfo = () => {
        getUser();
        setTagActivated('userInfo')
    }

    const handleUserBlogList = () => {
        getUserBlogList();
        setTagActivated('userBlog');
    }

    const handleDisplay = async () => {
        if (userCard?.status === -1) {
            setIsBlockUser(true);
        } else {
            if (userCard?.status === 1) {
                setIsDisplayFollow(true);
            } else {
                setIsDisplayFollow(false);
            }
        }

        onOptions();
    }

    const onOptions = async () => {
        let dataAfterCheck = [];

        if (isBlockUser) {
            dataAfterCheck.push({ label: 'Bỏ chặn tác giả', value: 'unblockUser' });
        } else {
            dataAfterCheck.push({ label: 'Chặn người này', value: 'blockUser' });
        }

        setData(dataAfterCheck)
    }

    const unblockUser = async () => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const res = await httpRequest.post("/users/unblock-user",
                {
                    followerId: userCard._id
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (res.data.success) {
                getUser();
                setIsBlockUser(false);
            }

        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const blockUser = async () => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const res = await httpRequest.post("/users/block-user",
                {
                    followerId: userCard._id
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (res.data.success) {
                getUser();
                setIsBlockUser(true);
            }

        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    return (
        <View style={styles.container}>
            {!isDefaultUser &&
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <icons.ICArrowLeft scale={1} color={COLORS.black} />
                    </TouchableOpacity>

                    <View style={styles.dropdownList}>
                        <Dropdown
                            style={styles.dropdown}
                            data={data}
                            labelField="label"
                            valueField="value"
                            onChange={item => {
                                if (item.value === 'unblockUser') {
                                    unblockUser();
                                } else if (item.value === 'blockUser') {
                                    blockUser();
                                }
                            }}
                            containerStyle={styles.dropdownBox}
                            renderRightIcon={
                                () => (
                                    <View style={styles.dropdownIcon}>
                                        <icons.ICOptions scale={1} color={COLORS.black} />
                                    </View>
                                )
                            }
                        />
                    </View>
                </View>
            }

            {userCard &&
                <View style={styles.user}>
                    <View style={styles.userFullInfo}>
                        <Image
                            style={styles.avatar}
                            source={userCard.avatar ?
                                { uri: userCard.avatar } :
                                require('../../assets/images/avatar.png')
                            }
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.username}>{userCard.username}</Text>
                            <Text style={styles.followerNumber}>{`${userCard.followerNumber} người theo dõi`}</Text>
                        </View>
                    </View>
                    {!isBlockUser && !isDefaultUser && (isDisplayFollow
                        ?
                        <TouchableOpacity style={styles.unfollowBtn} onPress={() => onUnfollow()}>
                            <Text style={styles.unfollowText}>Hủy theo dõi</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.followBtn} onPress={() => onFollow()}>
                            <Text style={styles.followText}>Theo dõi</Text>
                        </TouchableOpacity>
                    )}
                    {isDefaultUser &&
                        <View style={styles.editIcon}>
                            <TouchableOpacity style={styles.icon}>
                                <icons.ICLock
                                    scale={1}
                                    color={COLORS.black}
                                    onPress={() => navigation.navigate('ChangePassword', { previousScreen: 'Profile' })}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('EditUser')}>
                                <icons.ICEdit scale={1} color={COLORS.black} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={() => logout()}>
                                <icons.ICLogout scale={1} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            }

            {!isDefaultUser
                ?
                <View style={styles.horizontalScrollContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Tag
                            tagName={'Thông tin'}
                            tagID={'userInfo'}
                            tagActivated={tagActivated}
                            onPress={handleUserInfo}
                        />
                        <Tag
                            tagName={'Đăng tải'}
                            tagID={'userBlog'}
                            tagActivated={tagActivated}
                            onPress={handleUserBlogList}
                        />
                    </ScrollView>
                </View>
                :
                <View>
                    <Text style={styles.filterText}>Bài đăng của bạn</Text>
                </View>
            }

            {refreshing
                ?
                <ActivityIndicator style={{ marginTop: SIZES.medium }} size="large" color={COLORS.primary} />
                :
                <View style={styles.list}>
                    {tagActivated === 'userBlog'
                        ?
                        <FlatList
                            data={blogCardList}
                            renderItem={(data) => <Card
                                isDisplayUserInfo={false}
                                blogTitle={data.item.title}
                                thumbnail={data.item.thumbnail}
                                createdDate={data.item.createdDate}
                                onPressBlog={() => onPressBlog({ blogId: data.item._id, userId: data.item._userId })}
                            />}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <View>
                            {userCard?.email &&
                                <View>
                                    <Text style={styles.userInfoTitle}>Email: </Text>
                                    <Text style={styles.userInfoText}>{userCard?.email}</Text>
                                </View>
                            }
                            {userCard?.job &&
                                <View>
                                    <Text style={styles.userInfoTitle}>Lĩnh vực: </Text>
                                    <Text style={styles.userInfoText}>{userCard?.job}</Text>
                                </View>
                            }
                            {userCard?.description &&
                                <View>
                                    <Text style={styles.userInfoTitle}>Giới thiệu: </Text>
                                    <Text style={styles.userInfoText}>{userCard?.description}</Text>
                                </View>
                            }
                        </View>
                    }
                </View>
            }
        </View>
    );
}

export default Profile;
