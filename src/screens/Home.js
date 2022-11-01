import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  FancyAnswers,
  MutipleAnswers,
  SingleAnswers,
} from '../component/Answers';
import CurvedPath from '../component/CurvedPath';
import Header from '../component/Header';
import { QUIZ_TYPES } from '../constant';
import { quizzesDispatcher, quizzesSelector } from '../reducer/quizReducer';
import colors from '../theme/colors';
import { getQuizDes } from '../utils/quiz';

class Home extends Component {
  state = {
    quizzes: [],
    total: 0,
    answersTaken: {}, // {[id]: string[]}
    numOfTakingAnswers: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.quizzes.length > 0 && this.props.quizzes.length === 0) {
      // after fetch data
      this.setState({
        quizzes: nextProps.quizzes,
        total: nextProps.quizzes.length,
      });
    } else if (
      nextProps.route?.params?.quiz &&
      nextProps.route?.params?.quiz !== this.props.route?.params?.quiz
    ) {
      // back from Summary Screen
      this.setState({
        quizzes: [nextProps.route?.params?.quiz],
        total: 1,
        numOfTakingAnswers: 1,
      });
    }
  }

  fetchData = () => {
    this.props.fetchQuizzes();
  };

  onNext = (questionId, answers) => {
    this.setState(
      prev => {
        const { quizzes, total, answersTaken } = prev;
        const { subQuizzes = [] } = quizzes[0];
        let newTotal = total;
        let newQuizzes = [...quizzes];
        newQuizzes.shift();
        let newAnswerTaken = { ...answersTaken };
        newAnswerTaken[questionId] = answers;

        if (subQuizzes && subQuizzes.length > 0) {
          if (answers.includes('Yes')) {
            newQuizzes = [...subQuizzes, ...newQuizzes];
            newTotal = total + subQuizzes.length;
          } else {
            // if say No => remove the subQuizzes in quizzes, remove the answers for subQuizzes and change the total
            const subQuizIds = subQuizzes.map(s => s.id);
            const quizzesRemain = newQuizzes.filter(
              q => !subQuizIds.includes(q.id),
            );
            newTotal = newTotal - (newQuizzes.length - quizzesRemain.length);
            subQuizIds.map(sId => {
              delete newAnswerTaken[sId];
            });
          }
        }
        return {
          answersTaken: newAnswerTaken,
          quizzes: newQuizzes,
          total: newTotal,
          numOfTakingAnswers: prev.numOfTakingAnswers + 1,
        };
      },
      () => {
        if (this.state.quizzes.length === 0) {
          this.props.navigation.navigate('Summary', {
            answersTaken: this.state.answersTaken,
          });
        }
      },
    );
  };

  renderQuestion = () => {
    const { quizzes, answersTaken } = this.state;
    const { des, type, title, answers, validateAnswer, id } = quizzes[0] || {};
    const quizDes = des || getQuizDes(type);
    const answerTaken = answersTaken[id] || [];
    const componentProps = {
      answers,
      type,
      id,
      validateAnswer,
      onNext: this.onNext,
      answerTaken,
    };
    // TODO:Add more component if we have more types
    const answersComponent = {
      [QUIZ_TYPES.SINGLE_CHOICE]: <SingleAnswers {...componentProps} />,
      [QUIZ_TYPES.FANCY]: <FancyAnswers {...componentProps} />,
      [QUIZ_TYPES.MUTIPLE_CHOICE]: <MutipleAnswers {...componentProps} />,
      [QUIZ_TYPES.YES_NO_CHOICE]: (
        <SingleAnswers {...componentProps} answers={['Yes', 'No']} />
      ),
    };
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.question}>
          <Text style={styles.questionTitle}>{title}</Text>
          <Text style={styles.questionDes}>{quizDes}</Text>
        </View>
        <CurvedPath />
        {answersComponent[type]}
      </View>
    );
  };

  render() {
    const { quizzes, total, numOfTakingAnswers } = this.state;
    const { isFetching } = this.props;
    return (
      <View style={styles.screen}>
        <Header
          title={`Question ${total > 0 ? numOfTakingAnswers : 0} / ${total} `}
        />
        <View style={styles.containter}>
          {!isFetching && quizzes?.length > 0 && this.renderQuestion()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  containter: {
    flex: 1,
    marginTop: -20,
  },
  question: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  questionTitle: {
    color: colors.textBlack,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  questionDes: {
    color: colors.textBlackLight,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 6,
  },
  answers: {
    flex: 1,
  },
});

export default connect(quizzesSelector, quizzesDispatcher)(Home);
