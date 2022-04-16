export type ArticleType = {
  id: string;
  title: string;
  description: string;
};

const mockedArticles: Array<ArticleType> = [
  {
    id: 'art1',
    title: 'New react native architecture',
    description:
      'Comments about the new react native architecture that is coming.',
  },
  {
    id: 'art2',
    title: 'React 18.0.0 released',
    description: 'Comments about new version of react and its new features.',
  },
];

export const getArticlesEndpoint = '/articles';

export const mockArticlesHttpCalls = (url: string, timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        switch (url) {
          case getArticlesEndpoint:
            resolve(mockedArticles);
            return;
          default:
            reject({ message: 'Not found', code: 404 });
        }
      }
    }, timeout);
  });
};
