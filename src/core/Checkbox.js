/* eslint-disable react-native/no-inline-styles */
import { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../theme/colors';

class Checkbox extends PureComponent {
  render() {
    const {
      size = 24,
      checked = false,
      onChange,
      enabled = true,
      isRadio,
    } = this.props;
    const _borderColor = checked ? colors.green : colors.textBlackLight;

    return (
      <TouchableOpacity
        onPress={enabled ? onChange : () => {}}
        style={{
          width: size,
          height: size,
          borderRadius: isRadio ? 20 : 6,
          borderWidth: 1,
          borderColor: _borderColor,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg width={13} height={10}>
          <Path
            d={
              'M5.55346 7.55928L12.0048 0.804521C12.3926 0.398493 13.0213 0.398493 13.4091 0.804521C13.7969 1.21055 13.7969 1.86885 13.4091 2.27488L5.55346 10.5L0.990793 5.72275C0.603004 5.31672 0.603004 4.65842 0.990793 4.25239C1.37858 3.84636 2.00731 3.84636 2.3951 4.25239L5.55346 7.55928Z'
            }
            fill={checked ? colors.green : '#fff'}
          />
        </Svg>
      </TouchableOpacity>
    );
  }
}

export default Checkbox;
