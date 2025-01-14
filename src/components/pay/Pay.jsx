import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { staticRoutes } from '@/routes/routes';
import storeContext from '@/context/StoreContext';
import * as styled from './pay.module.css';
import { saveDataInServer } from '@/api/saveData';

const Result = ({ msg }) => {
  return (
    <div className={styled.pay}>
      <h1>{msg}</h1>
    </div>
  );
};

export const Pay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { data } = useContext(storeContext);
  const navigate = useNavigate();
  const requiredData = ['id', 'clientName', 'phone', 'email'];

  useEffect(() => {
    for (const key of requiredData) {
      if (!(key in data)) {
        navigate(staticRoutes.base);
      }
    }
    const saveData = async () => {
      try {
        await saveDataInServer(data);
      } catch (e) {
        setError(true);
      }
      setIsLoading(false);
    };
    saveData();
  }, [data]);

  if (!isLoading && !error) {
    return <Result msg="Оплата" />;
  }

  if (error) {
    return <Result msg="Ошибка" />;
  }

  return <Result msg="Сохраняем" />;
};
