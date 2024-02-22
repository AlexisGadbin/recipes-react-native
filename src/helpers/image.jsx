import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated'

export default function CachedImage(props) {
  const [cachedSource, setCachedSource] = useState(null)
  const { uri, style, className, sharedTransitionTag } = props

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri)
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData })
        } else {
          const response = await fetch(uri)
          const blob = await response.blob()
          const base64Data = await new Promise((resolve) => {
            // eslint-disable-next-line no-undef
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
              resolve(reader.result)
            }
          })
          await AsyncStorage.setItem(uri, base64Data)
          setCachedSource({ uri: base64Data })
        }
      } catch (error) {
        setCachedSource({ uri })
      }
    }

    getCachedImage()
  }, [])

  return (
    <Animated.Image
      className={className}
      style={style}
      source={cachedSource}
      sharedTransitionTag={sharedTransitionTag}
    />
  )
}
