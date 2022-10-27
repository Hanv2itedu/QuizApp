import { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../core/Button';
import MutipleAnswersComponent, { onValidateMutiple } from './MutipleAnswers';
import SingleAnswersComponent, { onValidateSingle } from './SingleAnswers';

const withAnswers = (AnswersComponent, onValidate) => {
  return class extends Component {
    state = {
      answerTaken: this.props.answerTaken,
      isValidAnswer: onValidate(this.props.validateAnswer)(
        this.props.answerTaken,
      ),
    };

    onValueChange = ({ values }) => {
      this.setState({
        answerTaken: values,
        isValidAnswer: onValidate(this.props.validateAnswer)(values),
      });
    };

    onNext = () => {
      const { onNext, id } = this.props;
      onNext?.(id, this.state.answerTaken);
    };

    render() {
      const { answers } = this.props;
      const { isValidAnswer, answerTaken } = this.state;
      return (
        <View style={styles.container}>
          <ScrollView style={styles.answers}>
            <AnswersComponent
              data={{ answers }}
              onValueChange={this.onValueChange}
              answerTaken={answerTaken}
            />
          </ScrollView>
          <View style={styles.footer}>
            <Button
              text="Next"
              onPress={this.onNext}
              disabled={!isValidAnswer}
            />
          </View>
        </View>
      );
    }
  };
};

const SingleAnswers = withAnswers(SingleAnswersComponent, onValidateSingle);
const MutipleAnswers = withAnswers(MutipleAnswersComponent, onValidateMutiple);
// If we want a mutiple answers with each value larger than 1
// we can create const MutipleAnswers = withAnswers(MutipleAnswersComponent, onCustomeValidateMutiple);
// the onCustomeValidateMutiple is a function that validate all values > 1

export { SingleAnswers, MutipleAnswers };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  answers: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  footer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
});
