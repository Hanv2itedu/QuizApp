import { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Checkbox from '../core/Checkbox';
import colors from '../theme/colors';

export const onValidateMutiple =
  validateAnswer =>
  (answerTaken = []) => {
    const { min = 1, max } = validateAnswer || {};
    return (
      (!min ? true : answerTaken.length >= min) &&
      (!max ? true : answerTaken.length <= max)
    );
  };

class MutipleAnswersComponent extends Component {
  state = {
    answerTaken: this.props.answerTaken || [],
  };

  onTakeAnswer = answer => () => {
    this.setState(
      prev => {
        const answerTaken = prev.answerTaken.includes(answer)
          ? [...prev.answerTaken].filter(a => a !== answer)
          : [...prev.answerTaken, answer];
        return { answerTaken };
      },
      () => {
        this.props.onValueChange({
          values: this.state.answerTaken,
          // isValidAnswer: onValidateMutiple(this.props.data?.validateAnswer)(
          //   this.state.answerTaken,
          // ),
        });
      },
    );
  };

  renderAnswer = (answer, index) => {
    const { answerTaken } = this.state;
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

export default MutipleAnswersComponent;
