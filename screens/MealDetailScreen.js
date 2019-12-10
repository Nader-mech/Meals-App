import React , {useEffect , useCallback} from 'react'
import {View , Text , StyleSheet , Button , ScrollView , Image} from 'react-native'
// import { MEALS } from '../data/dummy-data'
import MealItem from '../compenents/MealItem'
import {HeaderButtons , Item} from 'react-navigation-header-buttons'
import HeaderButton from '../compenents/HeaderButton'
import DefaultText from '../compenents/DefaultText'
import {useSelector , useDispatch} from 'react-redux'
import {toggleFavorite} from '../store/actions/meals'


const ListItem = props => {
  return (
    <View style={styles.ListItem}>
    <DefaultText>{props.children}</DefaultText>
    </View>
  )
}
 
const  MealDetailScreen  = (props) => {
mealId=props.navigation.getParam('MealId') 
const availableMeals = useSelector(state => state.meals.meals)
const currIsMealFavourite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId))
const selectedMeal = availableMeals.find((meal) => meal.id ===mealId)

const dispatch = useDispatch()

const toggleFavoriteHandler = useCallback(() => {
dispatch(toggleFavorite(mealId))
},[dispatch , mealId] )

useEffect(() => {
  props.navigation.setParams({mealTilte:selectedMeal.title})
  props.navigation.setParams({toggleFav :toggleFavoriteHandler})
},[selectedMeal, toggleFavoriteHandler])


useEffect(() =>{
  props.navigation.setParams({favMeals:currIsMealFavourite})
}, [currIsMealFavourite])



  return  (
    <ScrollView>
    <Image source={{uri:selectedMeal.imageUrl}} style={styles.image} />
    <View style={styles.details}>
    <DefaultText>{selectedMeal.duration}m</DefaultText>
    <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
    <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
    </View>
    <Text style={styles.title}>Ingredients</Text>
    {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
    <Text style={styles.title}>Steps</Text>
    {selectedMeal.steps.map(step=> <ListItem key={step}>{step}</ListItem>)}

       </ScrollView>
        
  )
}




MealDetailScreen.navigationOptions = (navigationData) => {
const mealId =navigationData.navigation.getParam('MealId')
const mealTilte = navigationData.navigation.getParam('mealTitle')
const toggleFavorite = navigationData.navigation.getParam('toggleFav')
const favMeals = navigationData.navigation.getParam('isFav')
 return {
   headerTitle: mealTilte ,
   headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
   <Item title='favourite'
    iconName= { favMeals ? 'ios-star' : 'ios-star-outline'}
    onPress ={toggleFavorite} /> 
   </HeaderButtons>
 }
 
}



const styles = StyleSheet.create({
   image:{
       width:'100%',
       height:200
    }, details:{
      flexDirection:'row' , 
      padding: 15 ,
      justifyContent:'space-around'

    }, title:{
      fontFamily:'open-sans-bold' ,
      textAlign:'center'
    }, ListItem:{
      marginHorizontal:20 ,
      marginVertical:10 ,
      borderColor: '#ccc' ,
      borderWidth:1 , 
      padding:10,

    }

})




export default MealDetailScreen