import React from 'react'
import { Text } from 'react-native'

import {SvgFromUri} from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'


type PlantsProps = RectButtonProps &{
    data:{
        name: string;
        photo: string
    }
}

export function PlantCardPrimary({data, ...rest}: PlantsProps) {
    return (
        <RectButton style={styles.container} {...rest}>
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.text}>
                {data.name}
            </Text>

        </RectButton>    )
}
