import React from 'react'
import { View } from 'react-native'

import LottieView from 'lottie-react-native'

import LoadAnimation from '../../assets/load.json'
import {styles} from './styles'

export function Load() {
    return (
        <View style={styles.container}>
           <LottieView source={LoadAnimation} autoPlay loop style={styles.animation}/>
        </View>
    )
}
