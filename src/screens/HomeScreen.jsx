import { StatusBar } from 'expo-status-bar'
import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from '../../assets/images/avatar.png'
import Categories from '../components/categories'
import Recipes from '../components/recipes'

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      setCategories([])
    }
  }

  const getRecipes = async (category) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      if (response && response.data) {
        setMeals(response.data.meals)
      }
    } catch (error) {
      setCategories([])
    }
  }

  const handleChangeCategory = (category) => {
    setMeals([])
    setActiveCategory(category)
    getRecipes(category)
  }

  useEffect(() => {
    getCategories()
    getRecipes(activeCategory)
  }, [])

  return (
    <View className="flex-1 bg-white">
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={avatar}
            style={{
              height: hp(5),
              width: hp(5.5),
            }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{
              fontSize: hp(1.7),
            }}
            className="text-neutral-600"
          >
            Hello, Alexis & Tess !
          </Text>
          <Text
            style={{
              fontSize: hp(3.8),
            }}
            className="font-semibold text-neutral-600"
          >
            Make your own food,
          </Text>
          <Text
            style={{
              fontSize: hp(3.8),
            }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search for recipes"
            placeholderTextColor="gray"
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} color="gray" strokeWidth={3} />
          </View>
        </View>
        {categories.length > 0 && (
          <>
            <View>
              <Categories
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
                categories={categories}
              />
            </View>

            <View>
              <Recipes meals={meals} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}
