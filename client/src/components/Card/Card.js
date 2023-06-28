import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './Card.style';

function Card(props) {
    const { thumbnail, blogTitle, createdDate, username, avatar, onPressBlog, onPressUser, isDisplayUserInfo } = props;

    return (
        <View style={styles.container}>
            {isDisplayUserInfo
                ?
                <TouchableOpacity onPress={onPressUser}>
                    <View style={styles.userInfo}>
                        <Image
                            style={styles.avatar}
                            source={avatar ? { uri: avatar } : require('../../assets/images/avatar.png')}
                        />
                        <Text style={styles.username}>{username}</Text>
                    </View>
                </TouchableOpacity>
                :
                <View style={{ marginTop: 8 }} />
            }
            <TouchableOpacity onPress={onPressBlog}>
                <View style={styles.blogInfo}>
                    <Text style={styles.blogTitle} numberOfLines={2}>
                        {blogTitle}
                    </Text>
                    <Image
                        style={styles.blogImg}
                        source={{
                            uri: thumbnail ? thumbnail : 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                </View>
            </TouchableOpacity>
            <View>
                <Text style={styles.updateDate}>{createdDate}</Text>
            </View>
        </View>
    );
}

export default Card;
