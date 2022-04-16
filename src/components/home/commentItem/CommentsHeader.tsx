import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';

import CustomText from '../../text';
import { theme } from '../../../theme';
import IconButton from './IconButton';
import { AuthorType } from '../../../services/comments';

interface CommentsHeaderType {
  id: string;
  author: AuthorType;
  date: string;
  votes: number;
  text: string;
}

const CommentsHeader: React.FC<CommentsHeaderType> = props => {
  const { id, author, date, votes, text } = props;

  const onReplyHandler = () => {
    console.log('reply', id);
  };

  const onShareHandler = () => {
    console.log('share', id);
  };

  const onReportHandler = () => {
    console.log('report', id);
  };

  const avatarLetter =
    author.name.length > 0 ? author.name[0].toUpperCase() : '👤';

  return (
    <View style={styles.container}>
      <View style={styles.authorView}>
        <Avatar
          size={24}
          rounded
          title={avatarLetter}
          containerStyle={{ backgroundColor: author.color }}
        />
        <CustomText text={author.name} style={styles.authorText} />
        <CustomText text={date} style={styles.dateText} />
      </View>
      <CustomText text={text} style={styles.commentText} />
      <View style={styles.actionView}>
        <Icon
          name="arrow-up-bold"
          color={theme.colors.grey}
          type="material-community"
          size={24}
        />

        <CustomText
          text={`${votes}`}
          style={[styles.actionsElements, styles.actionTexts]}
        />

        <Icon
          name="arrow-down-bold"
          color={theme.colors.grey}
          type="material-community"
          size={24}
        />

        <IconButton
          iconName={'comment'}
          title={'Reply'}
          onPress={onReplyHandler}
          containerStyle={styles.actionsElements}
          textStyle={styles.actionTexts}
        />

        <TouchableOpacity
          onPress={onShareHandler}
          style={styles.actionsElements}>
          <CustomText text={'Share'} style={styles.actionTexts} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onReportHandler}
          style={styles.actionsElements}>
          <CustomText text={'Report'} style={styles.actionTexts} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onReportHandler}
          style={styles.actionsElements}>
          <CustomText text={'Save'} style={styles.actionTexts} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  authorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 12,
    marginLeft: 5,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 12,
    color: theme.colors.grey,
  },
  commentText: {
    fontSize: 15,
    marginLeft: 30,
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 25,
  },
  actionsElements: {
    marginHorizontal: 3,
  },
  actionTexts: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default CommentsHeader;
