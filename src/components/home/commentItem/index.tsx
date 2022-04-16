import React from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import { CommentType } from '../../../services/comments';
import CommentsHeader from './CommentsHeader';

interface CommentItemType {
  comment: CommentType;
  containerStyle?: object;
}

const CommentItem: React.FC<CommentItemType> = ({
  comment,
  containerStyle,
}) => {
  const { author, date, text, votes, comments, id } = comment;

  return (
    <ScrollView
      horizontal={true}
      style={containerStyle}
      contentContainerStyle={styles.contentContainerStyle}>
      <FlatList
        data={comments || []}
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
});

export default CommentItem;
