import { QUIZ_TYPES } from '../constant';

const fakeData = [
  {
    id: '1',
    title: 'What is React Native?',
    answers: [
      'JavaScript library',
      'JavaScript framework',
      'Programming language',
      'Neither of the above',
    ],
    type: QUIZ_TYPES.SINGLE_CHOICE,
  },
  {
    id: '10',
    title: 'What is React Native Fancy?',
    answers: [
      'JavaScript library',
      'JavaScript framework',
      'Programming language',
      'Neither of the above',
    ],
    type: QUIZ_TYPES.FANCY,
  },
  {
    id: '2',
    title: 'React Native has a set components for:',
    des: 'Select mutiple answers (more than 1)',
    answers: ['Android platform', 'iOS platform', 'MacOS platform'],
    type: QUIZ_TYPES.MUTIPLE_CHOICE,
    validateAnswer: { min: 2 },
  },
  {
    id: '3',
    title: 'Do you have any pet?',
    type: QUIZ_TYPES.YES_NO_CHOICE,
    subQuizzes: [
      {
        id: '4',
        title: 'What is the kind of pet?',
        type: QUIZ_TYPES.SINGLE_CHOICE,
        answers: ['Dog', 'Cat', 'Hamter'],
      },
      {
        id: '5',
        title: 'What is pet name?',
        type: QUIZ_TYPES.SINGLE_CHOICE,
        answers: ['Dog name', 'Cat name', 'Hamter name'],
      },
    ],
  },
  {
    id: '6',
    title: 'What is the first letter of alphabet',
    type: QUIZ_TYPES.SINGLE_CHOICE,
    answers: ['A', 'B', 'C', 'D'],
  },
];

//fake api
export const fetchQuizzes = async () => {
  await setTimeout(() => {}, 4000);
  return { quizzes: fakeData };
};
