import { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Checkbox from '../core/Checkbox';
import colors from '../theme/colors';

export const onValidateSingle =
  () =>
  (answerTaken = []) => {
    return answerTaken.length > 0;
  };

class SingleAnswersComponent extends Component {
  onTakeAnswer = answer => () => {
    !this.props.answerTaken.includes(answer) &&
      this.props.onValueChange({
        values: [answer],
        // isValidAnswer: onValidateSingle([answer]),
      });
  };

  renderAnswer = (answer, index) => {
    const { answerTaken } = this.props;
    const isAnswerTaken = answerTaken.includes(answer);
    return (
      <TouchableOpacity
        style={[styles.answerItem, isAnswerTaken && styles.answerItemTaken]}
        key={String(answer + index)}
        onPress={this.onTakeAnswer(answer)}>
        <Text
          style={[styles.answerText, isAnswerTaken && styles.answerTextTaken]}>
          {answer}
        </Text>
        <Checkbox
          checked={isAnswerTaken}
          onChange={this.onTakeAnswer(answer)}
          isRadio
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { answers = [] } = this.props.data;
    return <>{answers.map(this.renderAnswer)}</>;
  }
}

const styles = StyleSheet.create({
  answerItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  answerItemTaken: {
    backgroundColor: colors.green,
  },
  answerText: {
    flex: 1,
    color: colors.textBlack,
  },
  answerTextTaken: {
    color: 'white',
  },
});

export default SingleAnswersComponent;
