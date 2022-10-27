/* eslint-disable react-native/no-inline-styles */
import { PureComponent } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../component/Header';
import Button from '../core/Button';
import { quizzesSelector } from '../reducer/quizReducer';
import colors from '../theme/colors';

const ICON_EDIT = require('../assets/Icon/ic_edit.png');

const onFlatQuizzes = quizzes => {
  const flatQuizzes = quizzes.reduce(
    (prev, cur) => {
      return [...prev, ...(cur.subQuizzes || [])];
    },
    [...quizzes],
  );
  return flatQuizzes;
};

class Summary extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  onGoback = quiz => () => {
    this.props.navigation.navigate('Home', { quiz });
  };

  onSubmit = () => {
    Alert.alert('Your answers has been submitted!');
  };

  renderAnswerView = (id, index) => {
    const answersTaken = this.props.route.params?.answersTaken;
    const { quizzes } = this.props;
    const flatQuizzes = onFlatQuizzes(quizzes);
    const quiz = flatQuizzes.find(q => q.id === id);
    return (
      <View
        key={String(id)}
        style={[styles.answerItem, index === 0 && { borderTopWidth: 0 }]}>
        <Text style={styles.questionNum}>Question {index + 1}</Text>
        <Text style={styles.questionTitle}>{quiz?.title}</Text>
        <TouchableOpacity
          style={styles.answerRow}
          onPress={this.onGoback({ ...quiz })}>
          <Image source={ICON_EDIT} style={styles.editIc} />
          <Text style={styles.answersTxt}>
            {(answersTaken[id] || []).join(', ')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const answersTaken = this.props.route.params?.answersTaken;
    return (
      <View style={styles.container}>
        <Header title="Summary" />
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.answersView}>
            {answersTaken &&
              Object.keys(answersTaken).map(this.renderAnswerView)}
          </ScrollView>
          <View style={styles.footer}>
            <Button text="Submit" onPress={this.onSubmit} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  answersView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  answerItem: {
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: colors.textBlackLight,
  },
  questionNum: {
    color: colors.textBlack,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  questionTitle: {
    color: colors.textBlackLight,
    fontSize: 16,
    lineHeight: 22,
    marginVertical: 8,
  },
  answersTxt: {
    color: colors.green,
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  editIc: {
    width: 14,
    aspectRatio: 1,
    marginRight: 5,
    marginTop: 6,
  },
  answerRow: {
    flexDirection: 'row',
  },
});

export default connect(quizzesSelector)(Summary);
