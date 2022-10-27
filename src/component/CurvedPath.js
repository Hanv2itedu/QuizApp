import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

class CurvedPath extends PureComponent {
  render() {
    return (
      <Svg width={width} height={20}>
        <Path
          d={`M0 0H${width}V0C${width} 10.0457 ${width} 19 ${
            width - 20
          } 19H20C8.95431 19 0 10.0457 0 0V0Z`}
          fill={'white'}
        />
      </Svg>
    );
  }
}

export default CurvedPath;
