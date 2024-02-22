import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import CachedImage from '../helpers/image'
import Loading from '../components/loading'

function RecipeDetailScreen({ route }) {
  const { recipe } = route.params

  const [isFavourite, setIsFavourite] = useState(false)
  const navigation = useNavigation()
  const [meal, setMeal] = useState(null)

  const getMealData = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      )
      if (response && response.data) {
        setMeal(response.data.meals[0])
      }
    } catch (error) {
      setMeal(null)
    }
  }

  useEffect(() => {
    getMealData()
  }, [])

  const ingredientsIndexes = () => {
    if (!meal) return []
    const indexes = []
    for (let i = 1; i <= 20; i += 1) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i)
      }
    }
    return indexes
  }

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/
    const match = url.match(regex)
    return match && match[1] ? match[1] : null
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar />
      <View className="flex-row justify-center">
        <CachedImage
          uri={recipe.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          sharedTransitionTag={recipe.idMeal}
        />
      </View>
      <Animated.View
        className="w-full absolute flex-row justify-between items-center pt-14"
        entering={FadeIn.delay(200).duration(1000)}
      >
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? '#f87171' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>

      {meal === null ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <Animated.View
            className="space-y-2"
            entering={FadeInDown.duration(700).springify().damping(12)}
          >
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{
                fontSize: hp(3),
              }}
            >
              {meal.strMeal}
            </Text>
            <Text
              className="font-medium flex-1 text-neutral-500"
              style={{
                fontSize: hp(2),
              }}
            >
              {meal.strArea}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  35
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  03
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  103
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: hp(6.5),
                  width: hp(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{
                    fontSize: hp(2),
                  }}
                  className="text-neutral-700 font-bold"
                />
                <Text
                  style={{
                    fontSize: hp(1.3),
                  }}
                  className="text-neutral-700 font-bold"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
            className="space-y-4"
          >
            <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-bold flex-1">
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes().map((index) => (
                <View key={index} className="flex-row space-x-4">
                  <View
                    style={{
                      height: hp(1.5),
                      width: hp(1.5),
                    }}
                    className="bg-amber-300 rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      className="font-extrabold text-neutral-700"
                      style={{
                        fontSize: hp(1.7),
                      }}
                    >
                      {meal[`strMeasure${index}`]}
                    </Text>
                    <Text
                      className="font-medium text-neutral-600"
                      style={{
                        fontSize: hp(1.7),
                      }}
                    >
                      {meal[`strIngredient${index}`]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
            className="space-y-4"
          >
            <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-bold flex-1">
              Instructions
            </Text>
            <Text
              style={{
                fontSize: hp(1.6),
              }}
              className="text-neutral-700"
            >
              {meal.strInstructions}
            </Text>
          </Animated.View>

          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
              className="space-y-4"
            >
              <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-bold flex-1">
                Video
              </Text>
              <View>
                <YoutubeIframe height={hp(30)} videoId={getYoutubeVideoId(meal.strYoutube)} />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  )
}
export default RecipeDetailScreen
