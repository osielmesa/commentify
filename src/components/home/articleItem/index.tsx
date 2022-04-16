import React from 'react';
import { ListRenderItem } from 'react-native';
import { Card } from '@rneui/themed';

import { ArticleType } from '../../../services/articles';
import CustomText from '../../text';

const ArticleItem: ListRenderItem<ArticleType> = ({ item }) => {
  const { title, description } = item;
  return (
    <Card containerStyle={{ marginTop: 15 }}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <CustomText text={description} />
    </Card>
  );
};

export default ArticleItem;
