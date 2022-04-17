// This component shows a card with the article info and contain an onPress callback
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';

import { ArticleType } from '../../../services/articles';
import CustomText from '../../text';

interface ArticleItemType {
  article: ArticleType;
  onPress?: Function;
}

const ArticleItem: React.FC<ArticleItemType> = ({ article, onPress }) => {
  const { title, description } = article;

  const onPressHandler = useCallback(() => {
    if (onPress) {
      onPress(article);
    }
  }, [article, onPress]);

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <CustomText text={description} />
      </Card>
    </TouchableOpacity>
  );
};

export default ArticleItem;
