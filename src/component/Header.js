import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import CurvedPath from './CurvedPath';

class Header extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <CurvedPath />
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
});

export default Header;
