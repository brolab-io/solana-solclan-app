import React from 'react';
import { Image } from 'native-base';

type Props = Pick<React.ComponentProps<typeof Image>, 'source' | 'alt' | 'w' | 'h'>;

const ButtonImageIcon: React.FC<Props> = ({ source, alt, w, h }) => {
  return <Image source={source} alt={alt} w={w} h={h} />;
};

export default ButtonImageIcon;
