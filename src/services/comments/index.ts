import { GET_COMMENTS_ENDPOINT } from '../endpoints';
import { getDarkColor } from '../../commons/utils/randoms';

export type AuthorType = {
  name: string;
  color: string;
};

export type CommentType = {
  id: string;
  articleId: string;
  author: AuthorType;
  date: string;
  text: string;
  votes: number;
  comments?: Array<CommentType>;
};

export const authors: Array<AuthorType> = [
  {
    name: 'Osiel',
    color: getDarkColor(),
  },
  {
    name: 'Mabel',
    color: getDarkColor(),
  },
  {
    name: 'Naruto',
    color: getDarkColor(),
  },
];

export const mockedComments: Array<CommentType> = [
  {
    id: 'com1',
    articleId: 'art1',
    author: authors[0],
    date: 'Jan 1, 2022',
    text: 'New NativeModule system (TurboModule) and the new Renderer (Fabric) for your Android and iOS libraries and apps.',
    votes: 100,
    comments: [
      {
        id: 'com2',
        articleId: 'art1',
        author: authors[1],
        date: 'Jan 2, 2022',
        text: 'I think this will really improve react native to another level',
        votes: 23,
        comments: [
          {
            id: 'com3',
            articleId: 'art1',
            author: authors[0],
            date: 'Jan 2, 2022',
            text: 'me too',
            votes: 2,
          },
        ],
      },
      {
        id: 'com8',
        articleId: 'art1',
        author: authors[2],
        date: 'Jan 2, 2022',
        text: 'Yes, I cannot wait to use it',
        votes: 23,
      },
    ],
  },
  {
    id: 'com4',
    articleId: 'art1',
    author: authors[2],
    date: 'Jan 8, 2022',
    text: 'I want to know if will be possible the migration of existing projects',
    votes: 57,
    comments: [
      {
        id: 'com5',
        articleId: 'art1',
        author: authors[0],
        date: 'Jan 2, 2022',
        text: 'Good question',
        votes: 12,
      },
    ],
  },
  {
    id: 'com6',
    articleId: 'art2',
    author: authors[2],
    date: 'Jan 1, 2022',
    text: 'Good improvements for our favorite library',
    votes: 108,
    comments: [
      {
        id: 'com7',
        articleId: 'art2',
        author: authors[0],
        date: 'Jan 2, 2022',
        text: 'Did you read about the new introduced useId hook? I love it.',
        votes: 77,
      },
    ],
  },
];

export const mockCommentsHttpCalls = (
  url: string,
  articleId: string,
  timeout: number,
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        switch (url) {
          case GET_COMMENTS_ENDPOINT:
            const comments = mockedComments.filter(
              el => el.articleId === articleId,
            );
            resolve(comments);
            return;
          default:
            reject({ message: 'Not found', code: 404 });
        }
      }
    }, timeout);
  });
};
