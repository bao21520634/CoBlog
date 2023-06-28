import { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Tag from '../../components/Tag';
import Card from "../../components/Card";

import { COLORS, SIZES } from '../../constants';

import styles from './Library.style';

import httpRequest from '../../utils/httpRequest';

function Library(props) {
    const { navigation } = props;

    const [tagActivated, setTagActivated] = useState('saved');
    const [refreshing, setRefreshing] = useState(true);
    const [blogCardList, setBlogCardList] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && updateFunction()
    }, [isFocused]);

    const updateFunction = () => {

        if (tagActivated === 'saved') {
            getSavedBlog({ tagId: 'saved' })
        } else if (tagActivated === 'loved') {
            getSavedBlog({ tagId: 'loved' })
        } else if (tagActivated === 'seen') {
            getSavedBlog({ tagId: 'seen' })
        }
    }

    const getSavedBlog = async ({ tagId }) => {
        setTagActivated(tagId);
        setRefreshing(true);

        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const blogsRes = await httpRequest.post("/blogs/get-saved-blog",
            {},
            {
                headers: { Authorization: `JWT ${token}` },
            }
        )

        if (blogsRes.data.success) {
            const blogListFromFetchApi = blogsRes.data.blogList;
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
                    setRefreshing(false);

                    const userListFromFetchApi = usersRes.data.profile;

                    card.username = userListFromFetchApi.username;
                    card.avatar = userListFromFetchApi?.avatar;
                }

                cardList.push(card);
            }

            if (cardList.length === 0) {
                setRefreshing(false);
            }

            setBlogCardList(cardList);
        }
    }

    const getLovedBlog = async ({ tagId }) => {
        setTagActivated(tagId);
        setRefreshing(true);

        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const blogsRes = await httpRequest.post("/blogs/get-loved-blog",
            {},
            {
                headers: { Authorization: `JWT ${token}` },
            }
        )

        if (blogsRes.data.success) {
            const blogListFromFetchApi = blogsRes.data.blogList;
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
                    setRefreshing(false);

                    const userListFromFetchApi = usersRes.data.profile;

                    card.username = userListFromFetchApi.username;
                    card.avatar = userListFromFetchApi?.avatar;
                }

                cardList.push(card);
            }

            if (cardList.length === 0) {
                setRefreshing(false);
            }

            setBlogCardList(cardList);
        }
    }

    const getSeenBlog = async ({ tagId }) => {
        setTagActivated(tagId);
        setRefreshing(true);

        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const blogsRes = await httpRequest.post("/blogs/get-seen-blog",
            {},
            {
                headers: { Authorization: `JWT ${token}` },
            }
        )

        if (blogsRes.data.success) {
            const blogListFromFetchApi = blogsRes.data.blogList;
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
                    setRefreshing(false);

                    const userListFromFetchApi = usersRes.data.profile;

                    card.username = userListFromFetchApi.username;
                    card.avatar = userListFromFetchApi?.avatar;
                }

                cardList.push(card);
            }

            if (cardList.length === 0) {
                setRefreshing(false);
            }

            setBlogCardList(cardList);
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
            <View style={styles.horizontalScrollContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Tag
                        tagName={'Đã lưu'}
                        tagID={'saved'}
                        tagActivated={tagActivated}
                        onPress={() => getSavedBlog({ tagId: 'saved' })}
                    />
                    <Tag
                        tagName={'Yêu thích'}
                        tagID={'loved'}
                        tagActivated={tagActivated}
                        onPress={() => getLovedBlog({ tagId: 'loved' })}
                    />
                    <Tag
                        tagName={'Đã xem'}
                        tagID={'seen'}
                        tagActivated={tagActivated}
                        onPress={() => getSeenBlog({ tagId: 'seen' })}
                    />
                </ScrollView>
            </View>

            {refreshing
                ?
                <ActivityIndicator style={{ marginTop: SIZES.medium }} size="large" color={COLORS.primary} />
                :
                <View style={styles.list}>
                    <FlatList
                        data={blogCardList}
                        renderItem={(data) => <Card
                            isDisplayUserInfo={true}
                            blogTitle={data.item.title}
                            thumbnail={data.item.thumbnail}
                            createdDate={data.item.createdDate}
                            username={data.item.username}
                            avatar={data.item.avatar}
                            onPressBlog={() => onPressBlog({ blogId: data.item._id, userId: data.item._userId })}
                            onPressUser={() => onPressUser({ userId: data.item._userId })}
                        />}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            }
        </View>
    );
}

export default Library;
