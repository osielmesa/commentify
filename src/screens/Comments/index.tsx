import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSelectedArticle } from '../../redux/articles/articlesSelectors';
import ArticleItem from '../../components/home/articleItem';
import CommentItem from '../../components/home/commentItem';
import { theme } from '../../commons/theme';
import { selectComments } from '../../redux/comments/commentsSelectors';
import { RootState } from '../../redux/store';

const CommentsScreen: React.FC = () => {
  const selectedArticle = useSelector(selectSelectedArticle);
  const comments = useSelector((state: RootState) =>
    selectComments(state, selectedArticle),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      {selectedArticle && <ArticleItem article={selectedArticle} />}

      <View style={styles.divider} />

      {/*TODO: it can be improved to get better rendering performance, .map will render even when items are not visible on screen*/}
      {comments.length > 0 && (
        <View>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 15,
    backgroundColor: theme.colors.grey,
  },
});

export default CommentsScreen;
