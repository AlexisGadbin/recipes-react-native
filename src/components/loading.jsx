import { View, ActivityIndicator } from 'react-native'

function Loading({ size = 'large', className = 'mt-20' }) {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator size={size} className={className} />
    </View>
  )
}
export default Loading
