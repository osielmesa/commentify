import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSelectedArticle } from '../../redux/articles/articlesSelectors';
import ArticleItem from '../../components/home/articleItem';
import useFetch from '../../hooks/useFetch';
import { GET_COMMENTS_ENDPOINT } from '../../services/endpoints';
import { CommentType } from '../../services/comments';
import CommentItem from '../../components/home/commentItem';
import { theme } from '../../theme';

const CommentsScreen: React.FC = () => {
  const selectedArticle = useSelector(selectSelectedArticle);
  const commentsRes = useFetch(GET_COMMENTS_ENDPOINT, {
    mockComments: { selectedArticle }, // getting the comments for selected article
  });

  let comments: Array<CommentType> = [];
  if (commentsRes && commentsRes.response) {
    comments = commentsRes.response;
  }

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
