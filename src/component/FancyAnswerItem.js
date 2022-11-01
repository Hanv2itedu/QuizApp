import { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Checkbox from '../core/Checkbox';
import commonStyles from './commonStyles';

//Example for the custom component
//At this we can have some fancy components with animated or something nice different with default styles
class FancyAnswerItem extends PureComponent {
  render() {
    const { answer, onChange, isAnswerTaken } = this.props;
    return (
      <TouchableOpacity
        style={[
          commonStyles.answerItem,
          isAnswerTaken && commonStyles.answerItemTaken,
        ]}
        onPress={onChange}>
        <Text
          style={[
            commonStyles.answerText,
            isAnswerTaken && commonStyles.answerTextTaken,
          ]}>
          Fancy answer: {answer}
        </Text>
        <Checkbox checked={isAnswerTaken} onChange={onChange} isRadio />
      </TouchableOpacity>
    );
  }
}

export default FancyAnswerItem;
