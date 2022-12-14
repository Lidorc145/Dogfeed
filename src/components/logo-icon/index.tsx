import * as React from 'react';
import Svg, { Color, Path } from 'react-native-svg';
import { Icon } from 'native-base';
import { InterfaceIconProps } from 'native-base/lib/typescript/components/primitives/Icon/types';
import { Image } from 'react-native';
import { Asset, useAssets } from 'expo-asset';


export /**
 * Main logo icon for the app
 * Created custom icon: https://docs.nativebase.io/icon
 * @param {InterfaceIconProps} props
 * @return {*}
 */
const LogoIcon: React.FC<{ color?: Color } & InterfaceIconProps> = ({ color, ...props }) => {
    const [assets, error] = useAssets([require('../../../assets/dogIcon.png')]);
    return (
        assets ? <Image source={assets[0]} /> : null

    );
};

LogoIcon.defaultProps = {
    color: 'purple',
};
