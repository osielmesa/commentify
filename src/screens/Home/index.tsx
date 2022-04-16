import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import { ArticleType } from '../../services/articles';
import ArticleItem from '../../components/home/articleItem';
import { screenNames } from '../../commons/screenNames';
import { setSelectedArticle } from '../../redux/articles/articlesSlice';
import { GET_ARTICLES_ENDPOINTS } from '../../services/endpoints';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const articlesRes = useFetch(GET_ARTICLES_ENDPOINTS, { mockArticles: true });

  const onArticlePressHandler = (article: ArticleType) => {
    dispatch(setSelectedArticle(article));
    navigation.navigate(screenNames.comments);
  };

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
