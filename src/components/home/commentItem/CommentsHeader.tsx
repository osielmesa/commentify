// Component that actually shows a comment and the actions that can be taken with it.
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Share,
  Alert,
} from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';

import CustomText from '../../text';
import { theme } from '../../../commons/theme';
import IconButton from '../../iconButton';
import { authors, AuthorType } from '../../../services/comments';
import AutoGrowingInput from '../../autoGrowingInput';
import { addReply, addVote } from '../../../redux/comments/commentsSlice';
import { getRandomId } from '../../../commons/utils/randoms';
import { selectSelectedArticle } from '../../../redux/articles/articlesSelectors';
import { nowAsLocaleString } from '../../../commons/utils/date';
import { selectVote } from '../../../redux/comments/commentsSelectors';
import { RootState } from '../../../redux/store';

interface CommentsHeaderType {
  id: string;
  author: AuthorType;
  date: string;
  votes: number;
  text: string;
}

const CommentsHeader: React.FC<CommentsHeaderType> = props => {
  const dispatch = useDispatch();
  const [showEdition, setShowEdition] = useState(false);
  const [commentTyped, setCommentTyped] = useState('');
  const selectedArticle = useSelector(selectSelectedArticle);
  const { id, author, date, votes, text } = props;
  const voteChanged = useSelector((state: RootState) => selectVote(state, id));

  const onReplyHandler = () => {
    setShowEdition(!showEdition);
  };

  const onShareHandler = () => {
    try {
      Share.share({
        message: `author: ${author.name}\ncomment: ${text}`,
      });
    } catch (error) {
      Alert.alert(
        'We regreat that an error has occurred. Please try again later!',
      );
      console.log('Error sharing', error);
    }
  };

  const onReportHandler = () => {
    Alert.alert(
      'Report functionality',
      'Here you will be able to report a comment!',
    );
  };

  const onSaveHandler = () => {
    Alert.alert(
      'Save functionality',
      'Here you will be able to save a comment!',
    );
  };

  // add a vote up to the comment
  const onVoteUp = () => {
    const newVote = voteChanged ? voteChanged + 1 : votes + 1;
    dispatch(addVote({ vote: newVote, commentId: id }));
  };

  // add a vote down to the comment
  const onVoteDown = () => {
    const newVote = voteChanged ? voteChanged - 1 : votes - 1;
    dispatch(addVote({ vote: newVote, commentId: id }));
  };

  // Add a reply to a comment
  const addCommentHandler = () => {
    dispatch(
      addReply({
        parentCommentId: id,
        reply: {
          id: getRandomId(),
          articleId: selectedArticle ? selectedArticle.id : '',
          author: authors[0], // because user is not introduced, lets always take first author
          votes: 0,
          date: nowAsLocaleString(),
          text: commentTyped,
        },
      }),
    );
    setCommentTyped('');
    setShowEdition(false);
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
          onPress={onVoteUp}
        />

        <CustomText
          text={voteChanged ? `${voteChanged}` : `${votes}`}
          style={[styles.actionsElements, styles.actionTexts]}
        />

        <Icon
          name="arrow-down-bold"
          color={theme.colors.grey}
          type="material-community"
          size={24}
          onPress={onVoteDown}
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
          onPress={onSaveHandler}
          style={styles.actionsElements}>
          <CustomText text={'Save'} style={styles.actionTexts} />
        </TouchableOpacity>
      </View>
      {showEdition && (
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

export default CommentsHeader;
