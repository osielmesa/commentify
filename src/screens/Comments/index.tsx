import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedArticle } from '../../redux/articles/articlesSelectors';
import ArticleItem from '../../components/home/articleItem';
import CommentItem from '../../components/home/commentItem';
import { theme } from '../../commons/theme';
import { selectComments } from '../../redux/comments/commentsSelectors';
import { RootState } from '../../redux/store';
import IconButton from '../../components/iconButton';
import AutoGrowingInput from '../../components/autoGrowingInput';
import { Icon } from '@rneui/themed';
import { addCommentToArticle } from '../../redux/comments/commentsSlice';
import { authors } from '../../services/comments';
import { getRandomId } from '../../commons/utils/randoms';
import { nowAsLocaleString } from '../../commons/utils/date';

const CommentsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const selectedArticle = useSelector(selectSelectedArticle);
  const comments = useSelector((state: RootState) =>
    selectComments(state, selectedArticle),
  );
  const [showAddComment, setShowAddComment] = useState(false);
  const [commentTyped, setCommentTyped] = useState('');

  const onToggleShowAddCommentHandler = () => {
    setShowAddComment(!showAddComment);
  };

  const addCommentHandler = () => {
    dispatch(
      addCommentToArticle({
        id: getRandomId(),
        articleId: selectedArticle ? selectedArticle.id : getRandomId(),
        author: authors[0], // Assuming always same author. Should be changed when user is introduced to the app.
        date: nowAsLocaleString(),
        text: commentTyped,
        votes: 0,
      }),
    );
    setCommentTyped('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      {selectedArticle && <ArticleItem article={selectedArticle} />}

      <View style={styles.addCommentView}>
        <IconButton
          iconName={'comment'}
          title={'Comment'}
          onPress={onToggleShowAddCommentHandler}
        />
        {showAddComment && (
          <KeyboardAvoidingView style={styles.replyContainer}>
            <AutoGrowingInput
              value={commentTyped}
              placeholder={'Reply here'}
              onChangeText={(replyText: React.SetStateAction<string>) =>
                setCommentTyped(replyText)
              }
              style={styles.replyInput}
            />
            <TouchableOpacity
              onPress={addCommentHandler}
              style={styles.sendReplyButton}>
              <Icon
                name="comment-check"
                color={theme.colors.primary}
                type="material-community"
                size={30}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>

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
  addCommentView: {
    marginTop: 10,
    marginLeft: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyInput: {
    marginLeft: 25,
    width: 250,
    marginTop: 5,
  },
  sendReplyButton: {
    marginLeft: 5,
    marginTop: 5,
  },
});

export default CommentsScreen;
