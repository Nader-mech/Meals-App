import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import { Platform } from 'react-native'
import Colors from '../constants/Colors'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import FavoritesScreen from '../screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import FiltersScreen from '../screens/FiltersScreen'



const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    }, headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },

    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}


const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealScreen,

    },
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})


const favNavigator = createStackNavigator({
    favourites: FavoritesScreen,
    MealDetail: MealDetailScreen,
}, {
    defaultNavigationOptions: defaultStackNavOptions
})


const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            }
            , tabBarColor: Colors.primaryColor
        }
    },
    favorites: {
        screen: favNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            }
            , tabBarColor: Colors.accentColor
        }
    },
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: Colors.accentColor,
    shifting: true
})
    : createBottomTabNavigator(tabScreenConfig
        , {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans'
                },
                activeTintColor: Colors.accentColor,

            }
        })
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator, navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})
export default createAppContainer(MainNavigator)

