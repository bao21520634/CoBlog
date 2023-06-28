import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import BottomTab from '../components/BottomTab/BottomTab';

function Layout(props) {

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBackgroundColorAsync('white');

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            NavigationBar.setVisibilityAsync('hidden');
            NavigationBar.setBackgroundColorAsync('white');

            return true;
        })

        return () => {
            backHandler.remove()
        };
    }, []);

    return <BottomTab />;
}

export default Layout;
