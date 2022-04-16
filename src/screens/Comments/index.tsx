import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSelectedArticle } from '../../redux/articles/articlesSelectors';
import ArticleItem from '../../components/home/articleItem';

const CommentsScreen: React.FC = () => {
  const selectedArticle = useSelector(selectSelectedArticle);

  return (
    <View>{selectedArticle && <ArticleItem article={selectedArticle} />}</View>
  );
};

const styles = StyleSheet.create({});

export default CommentsScreen;
