import React from 'react'
import { View, Text, Image } from 'react-native'

import avatarImg from '../../assets/joao.png'
import { styles } from './styles'

export function Header() {
    return (
        <View style={styles.container}>
           <View >
               <Text style={styles.greeting}>Olá,</Text>
               <Text style={styles.username}>João</Text>
           </View>
           <Image style={styles.image} source={avatarImg}/>
        </View>
    )
}
