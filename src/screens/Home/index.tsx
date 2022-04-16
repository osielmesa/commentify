import React from 'react';
import { View, Text, FlatList } from 'react-native';
import useFetch from '../../hooks/useFetch';
import { getArticlesEndpoint } from '../../services/articles';
import ArticleItem from '../../components/home/articleItem';

const HomeScreen: React.FC = () => {
  const articlesRes = useFetch(getArticlesEndpoint, { mockArticles: true });
  console.log('osiel', articlesRes);

  if (articlesRes.response) {
    return (
      <FlatList
        data={articlesRes.response}
        renderItem={ArticleItem}
        keyExtractor={item => item.id}
      />
    );
  }

  return (
    <View>
      <Text>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
