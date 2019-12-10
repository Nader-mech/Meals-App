import React from 'react'
import { StyleSheet , View } from 'react-native'
import {CATEGORIES,} from '../data/dummy-data'
import MealList from'../compenents/MealList'
import {useSelector} from 'react-redux'
import DefaultText from '../compenents/DefaultText'

const CategoryMealScreen = props => {
  
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
if(displayedMeals.length === 0){
  return <View style={styles.content }><DefaultText> No meals found .Maybe check filters </DefaultText></View>
}

  return <MealList ListData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};


const styles = StyleSheet.create({
    screen:{
        flex:1 ,
        justifyContent:'center' ,
        alignItems:'center'
    }, content :{
      flex: 1 ,
      justifyContent:'center' ,
      alignItems :'center'
     
    }
   
})


export default CategoryMealScreen