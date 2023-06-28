import { FlatList } from 'react-native';

import Card from '../../../components/Card';

function Blogs(props) {
    const { blogCardList, onPressUser, onPressBlog } = props;

    return (
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
    );
}

export default Blogs;
