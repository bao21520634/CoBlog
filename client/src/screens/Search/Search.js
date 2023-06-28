import { useEffect, useState } from 'react';
import { View, ScrollView, Keyboard, TouchableWithoutFeedback, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './Search.style';

import Tag from '../../components/Tag';

import Blogs from './Blogs';
import Tags from './Tags';
import Authors from './Authors';


import { icons, COLORS } from '../../constants';

import httpRequest from '../../utils/httpRequest';

function Search(props) {

    const { navigation } = props;

    const [tagActivated, setTagActivated] = useState('blogs');
    const [keyword, setKeyword] = useState("");
    const [blogCardList, setBlogCardList] = useState([]);
    const [tagCardList, setTagCardList] = useState([]);
    const [authorCardList, setAuthorCardList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        setKeyword('');
        onSearch();
    }, [tagActivated])

    const onSearch = () => {
        Keyboard.dismiss();

        if (tagActivated === 'blogs') {
            getBlogList();
        } else if (tagActivated === 'tags') {
            getTagList();
        } else if (tagActivated === 'authors') {
            getUserList();
        }
    }

    const getUser = async ({ userId }) => {
        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

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
                const authorList = [...authorCardList];

                for (var index in authorList) {
                    if (authorList[index]._id === userFromFetchApi._id) {
                        authorList[index] = userFromFetchApi;
                        if (userFromFetchApi?.status === 1) {
                            authorList[index].isFollowed = true;
                        } else {
                            authorList[index].isFollowed = false;
                        }
                    }
                }

                setAuthorCardList(authorList);
            }
        } catch {
            Alert.alert("", "Lỗi")
        }
    }

    const getUserList = async () => {
        setRefreshing(true);

        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const tagRes = await httpRequest.post("/users/search-author",
                {
                    name: keyword
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (tagRes.data.success) {
                setAuthorCardList(tagRes.data.userList);

                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi");
        }
    }

    const getTagList = async () => {
        setRefreshing(true);

        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const tagRes = await httpRequest.post("/tags/search-tag",
                {
                    name: keyword
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (tagRes.data.success) {
                setTagCardList(tagRes.data.tagList);
                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi");
        }
    }

    const getBlogList = async () => {
        setRefreshing(true);

        try {
            const storage = await AsyncStorage.getItem("token");

            const token = JSON.parse(storage);

            const blogRes = await httpRequest.post("/blogs/search-blog",
                {
                    name: keyword
                },
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            )

            if (blogRes.data.success) {
                const blogListFromFetchApi = blogRes.data.blogList;
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

                    const usersRes = await httpRequest.post("/users/get-profile",
                        {
                            authorId: blog._userId
                        },
                        {
                            headers: { Authorization: `JWT ${token}` },
                        }
                    )

                    if (usersRes.data.success) {
                        const userListFromFetchApi = usersRes.data.profile;

                        card.username = userListFromFetchApi.username;
                        card.avatar = userListFromFetchApi?.avatar;
                    }

                    cardList.push(card);
                }

                setBlogCardList(cardList);
                setRefreshing(false);
            }
        } catch {
            Alert.alert("", "Lỗi");
        }
    }

    const onFollowTag = async ({ tagId }) => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const res = await httpRequest.post("/tags/follow-tag",
            {
                tagId
            },
            {
                headers: { Authorization: `JWT ${token}` },
            }
        );

        if (res.data.success) {
            const tagFromFetchApi = res.data.tag;
            const tagList = [...tagCardList];

            for (var index in tagList) {
                if (tagList[index]._id === tagFromFetchApi._id) {
                    tagList[index] = tagFromFetchApi;
                    tagList[index].isFollowed = true;
                }
            }

            setTagCardList(tagList);
        }
    }

    const onUnfollowTag = async ({ tagId }) => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const res = await httpRequest.post("/tags/unfollow-tag",
            {
                tagId
            },
            {
                headers: { Authorization: `JWT ${token}` },
            }
        );

        if (res.data.success) {
            const tagFromFetchApi = res.data.tag;
            const tagList = [...tagCardList];

            for (var index in tagList) {
                if (tagList[index]._id === tagFromFetchApi._id) {
                    tagList[index] = tagFromFetchApi;
                    tagList[index].isFollowed = false;
                }
            }

            setTagCardList(tagList);
        }
    }

    const onFollowUser = async ({ userId }) => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const res = await httpRequest.post("/users/follow-user",
            {
                followerId: userId
            },
            {
                headers: { Authorization: `JWT ${token}` },
            }
        );

        if (res.data.success) {
            getUser({ userId });
        }
    }

    const onUnfollowUser = async ({ userId }) => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const res = await httpRequest.post("/users/unfollow-user",
            {
                followerId: userId
            },
            {
                headers: { Authorization: `JWT ${token}` },
            }
        );

        if (res.data.success) {
            getUser({ userId });
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

    const onPressUser = async ({ userId }) => {
        const storage = await AsyncStorage.getItem("user");

        const user = JSON.parse(storage);

        if (userId === user._id) {
            navigation.navigate("Thông tin cá nhân")
        } else {
            navigation.navigate("Profile", { userId: userId })
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View style={styles.searchbarContainer}>
                            <TextInput
                                style={styles.searchInput}
                                selectionColor={COLORS.primary}
                                value={keyword}
                                placeholder="Nhập từ khóa để tìm kiếm"
                                onChangeText={(text) => setKeyword(text)}
                            />

                            <View>
                                <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
                                    <icons.ICSearch scale={0.9} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.line} />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.horizontalScrollContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Tag
                        tagName={'Bài đăng'}
                        tagID={'blogs'}
                        tagActivated={tagActivated}
                        onPress={() => setTagActivated('blogs')}
                    />
                    <Tag
                        tagName={'Chủ đề'}
                        tagID={'tags'}
                        tagActivated={tagActivated}
                        onPress={() => setTagActivated('tags')}
                    />
                    <Tag
                        tagName={'Tác giả'}
                        tagID={'authors'}
                        tagActivated={tagActivated}
                        onPress={() => setTagActivated('authors')}
                    />
                </ScrollView>
            </View>


            <View style={styles.list}>
                {refreshing
                    ?
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    :
                    <View>
                        {tagActivated === 'blogs' && <Blogs blogCardList={blogCardList} onPressUser={onPressUser} onPressBlog={onPressBlog} />}
                        {tagActivated === 'tags' && <Tags tagCardList={tagCardList} onFollowTag={onFollowTag} onUnfollowTag={onUnfollowTag} />}
                        {tagActivated === 'authors' && <Authors authorCardList={authorCardList} onPressUser={onPressUser} onFollowUser={onFollowUser} onUnfollowUser={onUnfollowUser} />}
                    </View>
                }
            </View>
        </View>
    );
}

export default Search;
