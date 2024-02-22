import { View, Text, Pressable } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import Loading from './loading'
import CachedImage from '../helpers/image'

export default function Recipes({ meals }) {
  const navigation = useNavigation()

  return (
    <View className="mx-4 soace-y-3">
      <Text
        style={{
          fontSize: hp(3),
        }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {meals.length > 0 ? (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        ) : (
          <Loading size="large" className="mt-20" />
        )}
      </View>
    </View>
  )
}

function RecipeCard({ item, index, navigation }) {
  const isEven = index % 2 === 0

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        className="flex justify-center mb-4 space-y-1 w-full"
        style={{
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      >
        <CachedImage
          uri={item.strMealThumb}
          style={{
            height: index % 3 === 0 ? hp(25) : hp(35),
            width: '100%',
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.idMeal}
        />

        <Text
          className="font-semibold text-neutral-600 ml-2"
          style={{
            fontSize: hp(1.5),
          }}
        >
          {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
