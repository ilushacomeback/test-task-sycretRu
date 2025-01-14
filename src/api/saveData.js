import { apiRoute } from './apiRoute';

export const saveDataInServer = async (data) => {
  const defaultBody = {
    ApiKey: process.env.REACT_APP_API_KEY,
    MethodName: 'OSSale',
    paymentTypeId: 2,
    useDelivery: 0,
  };
  const response = await fetch(apiRoute, {
    body: JSON.stringify({
      ...defaultBody,
      ...data,
    }),
    method: 'POST',
  });

  return response;
};
