import { TouchableOpacity, Text } from 'react-native';

import styles from './Tag.style';

function Tag(props) {
    const { tagName, tagID, tagActivated, onPress } = props;

    return (
        <TouchableOpacity
            key={tagID}
            style={tagActivated === tagID ? styles.tagActivated : styles.tag}
            onPress={onPress}
        >
            <Text style={tagActivated === tagID ? styles.tagNameActivated : styles.tagName}>{tagName}</Text>
        </TouchableOpacity>
    );
}

export default Tag;
