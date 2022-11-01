import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default StyleSheet.create({
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
