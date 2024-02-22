import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated'
import CachedImage from '../helpers/image'

export default function Categories({ activeCategory, handleChangeCategory, categories }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.strCategory
          return (
            <TouchableOpacity
              key={category.strCategory}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View className={`rounded-full p-[6px] ${isActive ? 'bg-amber-400' : 'bg-black/10'}`}>
                <CachedImage
                  uri={category.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}
