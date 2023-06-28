import { useEffect, useState } from 'react';
import { ScrollView, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './Home.style';

import Tag from '../../components/Tag/Tag';
import Card from '../../components/Card/Card';

import { COLORS } from '../../constants';

import httpRequest from '../../utils/httpRequest';

function Home(props) {

    const { navigation } = props;

    const [refreshing, setRefreshing] = useState(true);

    const [tagActivated, setTagActivated] = useState('all');

    const [tagListFromFetchApi, setTagListFromFetchApi] = useState([]);
    const [blogCardList, setBlogCardList] = useState([]);

    useEffect(() => {
        onRefresh();
    }, []);

    const getSuggestedTag = async () => {
        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const res = await httpRequest.post("/tags/user-tag",
            {},
            {
                headers: { Authorization: `JWT ${token}` },
            }
        )

        if (res.data.success) {
            setTagListFromFetchApi(res.data.tagList);
        }
    }

    const getSuggestedBlog = async () => {
        setTagActivated('all');
        setRefreshing(true);

        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const blogsRes = await httpRequest.post("/blogs/list-suggested-blog",
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
                    const userListFromFetchApi = usersRes.data.profile;

                    card.username = userListFromFetchApi.username;
                    card.avatar = userListFromFetchApi?.avatar;
                }

                cardList.push(card);
            }

            setBlogCardList(cardList);
            setRefreshing(false);
        }
    }

    const getTagBlog = async ({ tagId }) => {
        setTagActivated(tagId);
        setRefreshing(true);

        const storage = await AsyncStorage.getItem("token");

        const token = JSON.parse(storage);

        const blogsRes = await httpRequest.post("/blogs/list-blog",
            {
                tagId
            },
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
                    const userListFromFetchApi = usersRes.data.profile;

                    card.username = userListFromFetchApi.username;
                    card.avatar = userListFromFetchApi?.avatar;
                }

                cardList.push(card);
            }
            setBlogCardList(cardList);
            setRefreshing(false);
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

    const onRefresh = () => {
        getSuggestedTag();
        getSuggestedBlog();
    };

    return (
        <View style={styles.container}>
            <View style={styles.tagList}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: 12 }} />
                    <Tag key={'all'} tagName={'Tất cả'} tagID={'all'} tagActivated={tagActivated} onPress={() => getSuggestedBlog()} />
                    {tagListFromFetchApi.map((tag) => <Tag key={tag._id} tagName={tag.name} tagID={tag._id} tagActivated={tagActivated} onPress={() => getTagBlog({ tagId: tag._id })} />)}
                </ScrollView>
            </View>

            <View style={styles.blogList}>
                {refreshing
                    ?
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    :
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
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                }
            </View>
        </View>
    );
}

export default Home;
