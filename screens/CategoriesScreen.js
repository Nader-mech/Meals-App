import React from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors'
import CategoryGridTile from '../compenents/CategoryGridTile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../compenents/HeaderButton'

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return <CategoryGridTile color={itemData.item.color} FoodTitle={itemData.item.title} onSelect={() => {
            props.navigation.navigate({
                routeName: 'CategoryMeals', params: {
                    categoryId: itemData.item.id
                }
            })
        }} />
    }

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} />

    )
}

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='menu' iconName='ios-menu' onPress={() => {
               navData.navigation.toggleDrawer()
             }} />
        </HeaderButtons>
    }

}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default CategoriesScreen