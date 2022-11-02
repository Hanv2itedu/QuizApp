import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  FancyAnswers,
  MutipleAnswers,
  SingleAnswers,
} from '../component/Answers';
import CurvedPath from '../component/CurvedPath';
import Header from '../component/Header';
import { QUIZ_TYPES } from '../constant';
import { fetchQuizzesAsync, quizzesSelector } from '../reducer/quizReducer';
import colors from '../theme/colors';
import { getQuizDes } from '../utils/quiz';

const DEFAULT_QUIZ_STATE = {
  quizzes: [],
  totalQuizzes: 0,
};

const DEFAULT_ANSWER_STATE = {
  answersTaken: {}, // {[id]: string[]}
  numOfTakingAnswers: 1,
};

const HomeScreen = () => {
  const { isFetching, quizzes: quizzesProps } = useSelector(quizzesSelector);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [quizStates, setQuizStates] = useState(DEFAULT_QUIZ_STATE);
  const [answerStates, setAnswerStates] = useState(DEFAULT_ANSWER_STATE);
  const { quizzes, totalQuizzes } = quizStates;
  const { answersTaken, numOfTakingAnswers } = answerStates;

  useEffect(() => {
    fetchData();
  }, []);

  // after fetching data
  useEffect(() => {
    if (quizzesProps?.length > 0 && quizzes?.length === 0) {
      setQuizStates({
        quizzes: quizzesProps,
        totalQuizzes: quizzesProps.length,
      });
    }
  }, [quizzesProps]);

  // after user answer last quiz
  useEffect(() => {
    if (quizzes.length === 0 && Object.keys(answersTaken).length > 0) {
      navigation.navigate('Summary', { answersTaken });
    }
  }, [quizzes, answersTaken]);

  // detect after navigating back from summary
  const quizFromSummary = route?.params?.quiz;
  useEffect(() => {
    if (!!quizFromSummary) {
      setQuizStates({
        quizzes: [quizFromSummary],
        totalQuizzes: 1,
      });
      setAnswerStates(prev => ({ ...prev, numOfTakingAnswers: 1 }));
    }
  }, [quizFromSummary]);

  const fetchData = () => {
    dispatch(fetchQuizzesAsync());
  };

  const onNext = (questionId, answers) => {
    const { subQuizzes = [] } = quizzes[0];
    let newTotal = totalQuizzes;
    let newQuizzes = [...quizzes];
    newQuizzes.shift();
    let newAnswerTaken = { ...answersTaken };
    newAnswerTaken[questionId] = answers;

    if (subQuizzes && subQuizzes.length > 0) {
      if (answers.includes('Yes')) {
        newQuizzes = [...subQuizzes, ...newQuizzes];
        newTotal = totalQuizzes + subQuizzes.length;
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
    setQuizStates({ quizzes: newQuizzes, totalQuizzes: newTotal });
    setAnswerStates(prev => ({
      answersTaken: newAnswerTaken,
      numOfTakingAnswers: prev.numOfTakingAnswers + 1,
    }));
    // this.setState(
    //   prev => {
    //     const { quizzes, total, answersTaken } = prev;
    //     const { subQuizzes = [] } = quizzes[0];
    //     let newTotal = total;
    //     let newQuizzes = [...quizzes];
    //     newQuizzes.shift();
    //     let newAnswerTaken = { ...answersTaken };
    //     newAnswerTaken[questionId] = answers;

    //     if (subQuizzes && subQuizzes.length > 0) {
    //       if (answers.includes('Yes')) {
    //         newQuizzes = [...subQuizzes, ...newQuizzes];
    //         newTotal = total + subQuizzes.length;
    //       } else {
    //         // if say No => remove the subQuizzes in quizzes, remove the answers for subQuizzes and change the total
    //         const subQuizIds = subQuizzes.map(s => s.id);
    //         const quizzesRemain = newQuizzes.filter(
    //           q => !subQuizIds.includes(q.id),
    //         );
    //         newTotal = newTotal - (newQuizzes.length - quizzesRemain.length);
    //         subQuizIds.map(sId => {
    //           delete newAnswerTaken[sId];
    //         });
    //       }
    //     }
    //     return {
    //       answersTaken: newAnswerTaken,
    //       quizzes: newQuizzes,
    //       total: newTotal,
    //       numOfTakingAnswers: prev.numOfTakingAnswers + 1,
    //     };
    //   },
    //   () => {
    //     if (this.state.quizzes.length === 0) {
    //       this.props.navigation.navigate('Summary', {
    //         answersTaken: this.state.answersTaken,
    //       });
    //     }
    //   },
    // );
  };

  const renderContent = () => {
    const { des, type, title, answers, validateAnswer, id } = quizzes[0] || {};
    const quizDes = des || getQuizDes(type);
    const answerTaken = answersTaken[id] || [];
    const componentProps = {
      answers,
      type,
      id,
      validateAnswer,
      onNext,
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

  return (
    <View style={styles.screen}>
      <Header
        title={`Question ${
          totalQuizzes > 0 ? numOfTakingAnswers : 0
        } / ${totalQuizzes} `}
      />
      <View style={styles.containter}>
        {!isFetching && quizzes?.length > 0 && renderContent()}
      </View>
    </View>
  );
};

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

export default HomeScreen;
