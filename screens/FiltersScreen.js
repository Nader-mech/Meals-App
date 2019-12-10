import React, { useState, useEffect  , useCallback} from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../compenents/HeaderButton'
import Colors from '../constants/Colors'
import {useDispatch} from'react-redux'
import {setFilters} from '../store/actions/meals'
const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.title}>{props.label}</Text>

      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Colors.primaryColor}
        value={props.state}
        onValueChange={props.onchange} />
    </View>
  )
}


const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegeterian, setIsVegeterian] = useState(false)
  const  dispatch = useDispatch()

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,  
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegeterian: isVegeterian
    }
   dispatch(setFilters(appliedFilters))

  }, [isVegeterian , isLactoseFree , isGlutenFree , isVegan])
  useEffect(() => {
    props.navigation.setParams({ save: saveFilters })
  },[saveFilters,])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions </Text>
      <FilterSwitch label='Gluten-Free' state={isGlutenFree} onchange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch label='Lactose-Free' state={isLactoseFree} onchange={newValue => setIsLactoseFree(newValue)} />
      <FilterSwitch label='Vegan' state={isVegan} onchange={newValue => setIsVegan(newValue)} />
      <FilterSwitch label='Vegeterian' state={isVegeterian} onchange={newValue => setIsVegeterian(newValue)} />



    </View>
  )
}

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='menu' iconName='ios-menu' onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='save' iconName='ios-save' onPress={
        navData.navigation.getParam('save')
  } />
    </HeaderButtons>,

  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  }, title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    margin: 10,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'

  }

})


export default FiltersScreen