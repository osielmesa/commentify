import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import useFetch from '../../commons/hooks/useFetch';
import { ArticleType } from '../../services/articles';
import ArticleItem from '../../components/home/articleItem';
import { screenNames } from '../../commons/screenNames';
import { setSelectedArticle } from '../../redux/articles/articlesSlice';
import { GET_ARTICLES_ENDPOINTS } from '../../services/endpoints';
import { loadComments, loadReplies } from '../../redux/comments/commentsSlice';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const articlesRes = useFetch(GET_ARTICLES_ENDPOINTS, { mockArticles: true });

  const onArticlePressHandler = (article: ArticleType) => {
    dispatch(setSelectedArticle(article));
    // @ts-ignore
    navigation.navigate(screenNames.comments);
  };

  useEffect(() => {
    // TODO: this has to be moved to comments screen to only put in the redux state the comments for the selected article (better performance)
    dispatch(loadComments());
    dispatch(loadReplies());
  }, [dispatch]);

  if (articlesRes.response) {
    return (
      <FlatList
        data={articlesRes.response}
        renderItem={({ item }: { item: ArticleType }) => (
          <ArticleItem article={item} onPress={onArticlePressHandler} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }

  return (
    <View>
      <Text>Loading articles...</Text>
    </View>
  );
};

export default HomeScreen;
