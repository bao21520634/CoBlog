import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../../screens/Home';
import Search from '../../../screens/Search';
import Library from '../../../screens/Library';
import Profile from '../../../screens/Profile';

import ContentUpload from '../../../screens/Upload/Content';
import MoreInfoUpload from '../../../screens/Upload/MoreInfo';

import { icons, COLORS, SIZES } from '../../../constants';

const Tab = createBottomTabNavigator();

const UploadStack = createNativeStackNavigator();

function UploadStackScreen() {
    return (
        <UploadStack.Navigator>
            <UploadStack.Screen name="ContentUpload" component={ContentUpload} options={{ headerShown: false }} />
            <UploadStack.Screen name="MoreInfoUpload" component={MoreInfoUpload} options={{ headerShown: false }} />
        </UploadStack.Navigator>
    );
}

// create a component
function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let icon;

                    if (route.name === 'Trang chủ') {
                        icon = focused ? (
                            <icons.ICHomeSolid scale={1} color={color} />
                        ) : (
                            <icons.ICHome scale={1} color={color} />
                        );
                    } else if (route.name === 'Tìm kiếm') {
                        icon = focused ? (
                            <icons.ICSearchSolid scale={1} color={color} />
                        ) : (
                            <icons.ICSearch scale={1} color={color} />
                        );
                    } else if (route.name === 'Đăng tải') {
                        icon = focused ? (
                            <icons.ICBlogSolid scale={1} color={color} />
                        ) : (
                            <icons.ICBlog scale={1} color={color} />
                        );
                    } else if (route.name === 'Thư viện') {
                        icon = focused ? (
                            <icons.ICBookmarkSolid scale={1} color={color} />
                        ) : (
                            <icons.ICBookmark scale={1} color={color} />
                        );
                    } else if (route.name === 'Thông tin cá nhân') {
                        icon = focused ? (
                            <icons.ICUserSolid scale={1} color={color} />
                        ) : (
                            <icons.ICUser scale={1} color={color} />
                        );
                    }

                    return icon;
                },
                headerShown: true,
                tabBarStyle: {
                    position: 'absolute',
                    height: 56,
                    paddingHorizontal: SIZES.xLarge,
                    paddingBottom: 6,
                    backgroundColor: COLORS.white,
                },
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.primary,
            })}
            sceneContainerStyle={{
                backgroundColor: COLORS.lightWhite,
            }}
            initialRouteName={Home}
        >
            <Tab.Screen name="Trang chủ" component={Home} />
            <Tab.Screen name="Tìm kiếm" component={Search} />
            <Tab.Screen name="Đăng tải" component={UploadStackScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Thư viện" component={Library} />
            <Tab.Screen name="Thông tin cá nhân" component={Profile} />
        </Tab.Navigator>
    );
}

export default BottomTabs;
