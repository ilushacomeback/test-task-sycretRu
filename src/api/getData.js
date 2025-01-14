import { apiRoute } from './apiRoute';

export const getDataFromServer = async () => {
  const response = await fetch(apiRoute, {
    body: JSON.stringify({
      ApiKey: process.env.API_KEY,
      MethodName: 'OSGetGoodList',
    }),
    method: 'POST',
  });

  return response;
};
