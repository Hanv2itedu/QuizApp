import { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Checkbox from '../core/Checkbox';
import styles from './commonStyles';

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
    const { answerTaken, ItemAnswerComponent } = this.props;
    const isAnswerTaken = answerTaken.includes(answer);
    return !ItemAnswerComponent ? (
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
    ) : (
      <ItemAnswerComponent
        key={String(answer + index)}
        answer={answer}
        isAnswerTaken={isAnswerTaken}
        onChange={this.onTakeAnswer(answer)}
      />
    );
  };

  render() {
    const { answers = [] } = this.props.data;
    return <>{answers.map(this.renderAnswer)}</>;
  }
}

export default SingleAnswersComponent;
