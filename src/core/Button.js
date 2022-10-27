import { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../theme/colors';

class Button extends PureComponent {
  render() {
    const { text, disabled, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.btn, !disabled && styles.btnActive]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, !disabled && styles.textActive]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.textBlack,
  },
  textActive: {
    color: 'white',
  },
});

export default Button;
