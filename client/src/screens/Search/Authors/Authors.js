import { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Authors.style';

function Authors(props) {
    const { authorCardList, onFollowUser, onUnfollowUser, onPressUser } = props;
    const [userId, setUserId] = useState();

    useEffect(() => {
        (async () => {
            const storage = await AsyncStorage.getItem("user");

            const user = JSON.parse(storage);

            setUserId(user._id);
        })()
    }, [])

    return (
        <FlatList
            data={authorCardList}
            renderItem={(data) => (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => onPressUser({ userId: data.item._id })}>
                        <View style={styles.authorInfo}>
                            <Text style={styles.authorName}>{data.item.username}</Text>
                            <Text style={styles.jobName}>{data.item?.job}</Text>
                        </View>
                    </TouchableOpacity>

                    {(data.item.status !== -1) && (data.item._id !== userId) && (data.item.isFollowed
                        ?
                        <TouchableOpacity style={styles.unfollowBtn} onPress={() => onUnfollowUser({ userId: data.item._id })}>
                            <Text style={styles.unfollowText}>Hủy theo dõi</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.followBtn} onPress={() => onFollowUser({ userId: data.item._id })}>
                            <Text style={styles.followText}>Theo dõi</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default Authors;
