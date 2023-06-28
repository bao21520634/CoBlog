import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './Tags.style';

function Tags(props) {
    const { tagCardList, onFollowTag, onUnfollowTag } = props

    return (
        <FlatList
            data={tagCardList}
            renderItem={(data) => (
                <View style={styles.tagContainer}>
                    <View style={styles.tagInfo}>
                        <Text style={styles.tagName}>{data.item.name}</Text>
                        <Text style={styles.follow}>{`${data.item.followerNumber} lượt theo dõi`}</Text>
                    </View>

                    {data.item.isFollowed
                        ?
                        <TouchableOpacity style={styles.unfollowBtn} onPress={() => onUnfollowTag({ tagId: data.item._id })}>
                            <Text style={styles.unfollowText}>Hủy theo dõi</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.followBtn} onPress={() => onFollowTag({ tagId: data.item._id })}>
                            <Text style={styles.followText}>Theo dõi</Text>
                        </TouchableOpacity>
                    }
                </View>
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default Tags;
