import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import RenderHtml from 'react-native-render-html';

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './Blog.style';

import { icons, COLORS, SIZES } from '../../constants';

import httpRequest from '../../utils/httpRequest';

function Blog(props) {
    const { navigation, route } = props;

    const [blogId, setBlogId] = useState('');
    const [html, setHTML] = useState('');
    const [title, setTitle] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [loves, setLoves] = useState();
    const [views, setViews] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [tagNameList, setTagNameList] = useState([]);
    const [userCard, setUserCard] = useState();
    const [isDisplayFollow, setIsDisplayFollow] = useState(false);
    const [isBlockUser, setIsBlockUser] = useState(false);
    const [isDefaultUser, setIsDefaultUser] = useState(false);
    const [isLovedBlog, setIsLovedBlog] = useState(false);
    const [isSavedBlog, setIsSavedBlog] = useState(false);
    const [isBlockBlog, setIsBlockBlog] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        getUser();
        getBlog();
    }, []);

    useEffect(() => {
        handleDisplay();
    }, [userCard])

    const getUser = async () => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const userRes = await httpRequest.post("/users/get-profile",
                {
                    authorId: route.params.userId
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
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const getBlog = async () => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const blogRes = await httpRequest.post("/blogs/get-blog",
                {
                    blogId: route.params.blogId
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (blogRes.data.success) {
                const blogFromFetchApi = blogRes.data.blog;

                setBlogId(blogFromFetchApi._id)
                setHTML(blogFromFetchApi.content);
                setTitle(blogFromFetchApi.title);
                setThumbnail(blogFromFetchApi.thumbnail);
                setLoves(blogFromFetchApi.loves);
                setViews(blogFromFetchApi.views);
                setCreatedAt(blogFromFetchApi.createdAt.substring(0, 10));
                setIsLovedBlog(blogFromFetchApi.isLoved);
                setIsSavedBlog(blogFromFetchApi.isSaved);
                setIsBlockBlog(blogFromFetchApi.status === -1)

                const tagsRes = await httpRequest.post("/tags/blog-tag", {
                    blogId: route.params.blogId
                })

                const blogListCreatedDate = new Date(blogFromFetchApi.createdAt);
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const today = new Date();
                const diffDays = Math.round(Math.abs((today - blogListCreatedDate) / oneDay));
                let createdDate;

                if (diffDays === 0) {
                    const time = Math.round(Math.abs((today - blogListCreatedDate) / 1000)); // 1s = 1000ms

                    if (time >= (60 * 60)) {
                        createdDate = `${Math.round(time / (60 * 60))} tiếng trước`;
                    } else if (time >= 60) {
                        createdDate = `${Math.round(time / 60)} phút trước`;
                    } else {
                        createdDate = `${time} giây trước`;
                    }
                } else if (diffDays < 7) {
                    createdDate = `${Math.round(diffDays)} ngày trước`;
                } else if (diffDays < (4 * 7)) { // < 1 month
                    createdDate = `${Math.round(diffDays / 7)} tuần trước`;
                } else if (diffDays < (4 * 7 * 12)) { // < 1 year
                    createdDate = `${Math.round(diffDays / (4 * 7))} tháng trước`;
                } else {
                    createdDate = `${blogListCreatedDate.toISOString().substring(0, 10)}`;
                }

                setUserCard(prevState => ({ ...prevState, createdDate }));

                if (tagsRes.data.success) {
                    const tagListFromFetchApi = tagsRes.data.tagList;
                    const tagList = []

                    for (var tagFromFetchApi of tagListFromFetchApi) {
                        tagList.push(tagFromFetchApi.name);
                    }

                    setTagNameList(tagList);
                }
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
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

    const onLoveBlog = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/blogs/love-blog",
                    {
                        blogId: route.params.blogId
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getBlog();
                    setIsLovedBlog(true);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const onUnloveBlog = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/blogs/unlove-blog",
                    {
                        blogId: route.params.blogId
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getBlog();
                    setIsLovedBlog(false);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const onSaveBlog = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/blogs/save-blog",
                    {
                        blogId: route.params.blogId
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getBlog();
                    setIsSavedBlog(true);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const onUnsaveBlog = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        if (userCard) {
            try {
                const res = await httpRequest.post("/blogs/unsave-blog",
                    {
                        blogId: route.params.blogId
                    },
                    {
                        headers: { Authorization: `JWT ${token}` },
                    }
                )

                if (res.data.success) {
                    getBlog();
                    setIsSavedBlog(false);
                }
            } catch {
                Alert.alert("", "Lỗi")
            }
        }
    }

    const handleDisplay = async () => {
        const storage = await AsyncStorage.getItem("user");

        const user = JSON.parse(storage);

        if (user._id === userCard?._id) {
            setIsDefaultUser(true);
        }

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

    const onPressUser = async () => {
        const storage = await AsyncStorage.getItem("user");

        const user = JSON.parse(storage);

        if (userCard._id === user._id) {
            navigation.navigate("Thông tin cá nhân")
        } else {
            navigation.navigate("Profile", { userId: userCard._id })
        }
    }

    const onOptions = async () => {
        let dataAfterCheck = [];

        if (isDefaultUser) {
            dataAfterCheck.push({ label: 'Chỉnh sửa blog', value: 'editBlog' })
        } else {
            if (isBlockUser) {
                dataAfterCheck.push({ label: 'Bỏ chặn tác giả', value: 'unblockUser' });
            } else {
                dataAfterCheck.push({ label: 'Chặn người này', value: 'blockUser' });
            }

            if (!isBlockBlog) {
                dataAfterCheck.push({ label: 'Ẩn bài viết', value: 'hideBlog' });
            }
        }

        setData(dataAfterCheck)
    }

    const editBlog = () => {
        navigation.navigate('Đăng tải',
            {
                screen: 'ContentUpload',
                params: {
                    blogId,
                    content: html,
                    title,
                    thumbnail,
                    tagNameList
                }
            }
        )
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

    const hideBlog = async () => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const res = await httpRequest.post("/blogs/block-blog",
                {
                    blogId
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (res.data.success) {
                setIsBlockBlog(false);
                getBlog();
            }

        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <icons.ICArrowLeft scale={1} color={COLORS.black} />
                </TouchableOpacity>

                {html &&
                    <View>
                        <View style={styles.statusIconList}>
                            {!isBlockBlog &&
                                (
                                    isLovedBlog
                                        ?
                                        <TouchableOpacity style={styles.statusIcon} onPress={onUnloveBlog}>
                                            <icons.ICHeartSolid scale={1} color={COLORS.black} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.statusIcon} onPress={onLoveBlog}>
                                            <icons.ICHeart scale={1} color={COLORS.black} />
                                        </TouchableOpacity>
                                )
                            }
                            {!isBlockBlog &&
                                (
                                    isSavedBlog
                                        ?
                                        <TouchableOpacity style={styles.statusIcon} onPress={onUnsaveBlog}>
                                            <icons.ICBookmarkSave scale={1} color={COLORS.black} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.statusIcon} onPress={onSaveBlog}>
                                            <icons.ICBookmarkAdd scale={1} color={COLORS.black} />
                                        </TouchableOpacity>
                                )
                            }

                            <View style={styles.dropdownList}>
                                <Dropdown
                                    style={styles.dropdown}
                                    data={data}
                                    labelField="label"
                                    valueField="value"
                                    onChange={item => {
                                        if (isDefaultUser) {
                                            editBlog();
                                        } else {
                                            if (item.value === 'unblockUser') {
                                                unblockUser();
                                            } else if (item.value === 'blockUser') {
                                                blockUser();
                                            } else if (item.value === 'hideBlog') {
                                                hideBlog();
                                            }
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
                    </View>
                }
            </View>



            <ScrollView showsVerticalScrollIndicator={false}>
                {userCard &&
                    <TouchableOpacity style={styles.firstUserCard} onPress={onPressUser}>
                        <View style={styles.userInfo}>
                            <Image
                                style={styles.avatar}
                                source={userCard?.avatar ? { uri: userCard?.avatar } : require('../../assets/images/avatar.png')}
                            />

                            <View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.username}>{userCard?.username}</Text>

                                    {!isBlockUser && !isDefaultUser && (isDisplayFollow &&
                                        <Text style={styles.followingText}>Đang theo dõi</Text>
                                    )}
                                </View>

                                {userCard?.createdDate &&
                                    <Text style={styles.followNumberText}>{`Đã đăng vào ${userCard?.createdDate}`}</Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                <View style={styles.blogContent}>
                    <Text style={styles.blogTitle}>{title}</Text>

                    <RenderHtml
                        contentWidth={1000}
                        source={{ html }}
                    />

                    {html &&
                        <View>
                            <View style={styles.line} />

                            <View style={styles.statusInfoCard}>
                                <View style={styles.statusInfo}>
                                    <Text style={styles.statusInfoTitle}>Lượt xem: </Text>
                                    <Text style={styles.statusInfoNumber}>{views}</Text>
                                </View>

                                <View style={[styles.statusInfo, { marginLeft: SIZES.xLarge }]}>
                                    <Text style={styles.statusInfoTitle}>Lượng tim: </Text>
                                    <Text style={styles.statusInfoNumber}>{loves}</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.blogInfoTitle}>Chủ đề: </Text>
                                <View style={styles.tagNameList}>
                                    {tagNameList.map((tagName, i) => (
                                        <View key={i} style={styles.tag}>
                                            <Text style={styles.tagName}>{tagName}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <View>
                                <Text style={styles.blogInfoTitle}>Người đăng: </Text>
                                <View style={styles.userInfoCard}>
                                    <TouchableOpacity onPress={onPressUser}>
                                        <View style={styles.userInfo}>
                                            <Image
                                                style={styles.avatar}
                                                source={userCard?.avatar ? { uri: userCard?.avatar } : require('../../assets/images/avatar.png')}
                                            />

                                            <View>
                                                <Text style={styles.username}>{userCard?.username}</Text>
                                                <Text style={styles.followNumberText}>{`${userCard?.followerNumber} người theo dõi`}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
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
                                </View>
                            </View>

                            <View style={styles.createdAtContainer}>
                                <Text style={styles.blogInfoTitle}>Ngày đăng: </Text>
                                <Text style={styles.createdAt}>{createdAt}</Text>
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        </View >
    );
}

export default Blog;
