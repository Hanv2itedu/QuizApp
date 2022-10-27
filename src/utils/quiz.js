import { QUIZ_TYPES } from '../constant';

const getQuizDes = type => {
  switch (type) {
    case QUIZ_TYPES.SINGLE_CHOICE:
      return 'Select correct answer';
    case QUIZ_TYPES.MUTIPLE_CHOICE:
      return 'Select mutiple answers';
    case QUIZ_TYPES.YES_NO_CHOICE:
      return 'Select one';
    default:
      return '';
  }
};

export { getQuizDes };
