import React from 'react';
import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import FastImage from 'react-native-fast-image';
type CommonImageProps = {
  uri: string;
  style: StyleProp<ImageStyle>;
};

const CommonImage: React.FC<CommonImageProps> = ({uri, style}) => {
  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      style={style as StyleProp<ImageStyle>}
    />
  );
};

export default CommonImage;
