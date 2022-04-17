import React from 'react';
import { StyleSheet, FlatList, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CommentType } from '../../../services/comments';
import CommentsHeader from './CommentsHeader';
import { theme } from '../../../commons/theme';
import { selectAddedReplies } from '../../../redux/comments/commentsSelectors';
import { RootState } from '../../../redux/store';

interface CommentItemType {
  comment: CommentType;
  containerStyle?: object;
}

const CommentItem: React.FC<CommentItemType> = ({
  comment,
  containerStyle,
}) => {
  const { author, date, text, votes, comments = [], id } = comment;
  const replies = useSelector((state: RootState) =>
    selectAddedReplies(state, id),
  );

  return (
    <ScrollView
      horizontal={true}
      style={containerStyle}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.commentLine} />
      <FlatList
        data={[...replies, ...comments]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CommentItem comment={item} containerStyle={styles.containerStyle} />
        )}
        ListHeaderComponent={() => (
          <CommentsHeader
            id={id}
            author={author}
            date={date}
            votes={votes}
            text={text}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    maxWidth: '110%',
    minWidth: 300,
  },
  containerStyle: {
    marginLeft: 30,
    paddingRight: 30,
  },
  commentLine: {
    position: 'absolute',
    top: 15,
    left: 12,
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.grey,
  },
});

export default CommentItem;
