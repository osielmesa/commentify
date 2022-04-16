import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useFetch from '../../hooks/useFetch';
import { ArticleType, getArticlesEndpoint } from '../../services/articles';
import ArticleItem from '../../components/home/articleItem';
import { screenNames } from '../../commons/screenNames';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const articlesRes = useFetch(getArticlesEndpoint, { mockArticles: true });

  const onArticlePressHandler = (article: ArticleType) => {
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
