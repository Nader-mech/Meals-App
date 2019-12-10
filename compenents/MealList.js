import React from 'react'
import {FlatList , StyleSheet , View} from 'react-native'
import MealItem from './MealItem'
import {useSelector} from 'react-redux'

const MealList = props => {
  const favoriteMeals = useSelector(state =>state.meals.favoriteMeals)
    const renderMealItem = (itemData) => {
      const isfavorite= favoriteMeals.some(meal => meal.id ===itemData.item.id)
        return <MealItem 
        image={itemData.item.imageUrl}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
         duration={itemData.item.duration} 
        title={itemData.item.title}
         onSelectMeal={() =>{
           props.navigation.navigate({
             routeName:'MealDetail' , params:{
               MealId:itemData.item.id ,
               mealTitle: itemData.item.title ,
               isFav: isfavorite
             }
           })
         }} />
      }
    return(
       <View style={styles.screen}>
       <FlatList  style={{width:'100%'}}  data={props.ListData} keyExtractor={(item, index) => item.id }  renderItem={renderMealItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1 ,
        justifyContent:'center' ,
        alignItems:'center'
    }, 
   
})

export default MealList