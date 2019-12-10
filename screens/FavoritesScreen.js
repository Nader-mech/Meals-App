import React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import MealList from '../compenents/MealList'
import {useSelector} from 'react-redux'
import {HeaderButtons , Item}from 'react-navigation-header-buttons'
import HeaderButton from '../compenents/HeaderButton'
import DefaultText from '../compenents/DefaultText'
const  FavoritesScreen  = (props) => {
  const favMeals = useSelector(state => state.meals.favoriteMeals)
   if(favMeals.length ===0 || !favMeals){
     return (
     <View style={styles.content}>
     <DefaultText> No Favorite meals found. Start adding some </DefaultText>
     </View>
     )
   }
  return <MealList ListData={favMeals} navigation={props.navigation}/>
}


FavoritesScreen.navigationOptions = (navData) =>{
 return {
  headerTitle:'Your Favourites', 
  headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item  title='menu' iconName='ios-menu' onPress={() => {
    navData.navigation.toggleDrawer()
  }} />
  </HeaderButtons>
}
}
const styles = StyleSheet.create({
  content:{
    flex:1 , 
    justifyContent:'center' ,
    alignItems: 'center'
  }
})


export default FavoritesScreen