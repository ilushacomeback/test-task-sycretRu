import React, { useEffect, useState, useContext } from 'react';
import { getDataFromServer } from '@/api/getData';
import { CardItem } from '../cardItem/CardItem';
import * as styled from './cards.module.css';
import { staticRoutes } from '@/routes/routes';
import { useNavigate } from 'react-router';
import storeContext from '@/context/StoreContext';

export const Cards = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const { handleSetData } = useContext(storeContext);
  const navigate = useNavigate();

  const handleClick = (data) => () => {
    handleSetData(data);
    navigate(staticRoutes.contact);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDataFromServer();
        const data = await response.json();
        setDataFromServer(data.data.reverse());
      } catch (e) {
        console.log(e)
      }
    };
    getData();
  }, []);

  return (
    <ul className={styled.cards}>
      {dataFromServer.map(
        ({ ID, PRICE, NAME, PRIMARYKEY, DISCOUNT, SUMMA, TABLENAME }) => (
          <CardItem
            price={PRICE}
            discount={DISCOUNT}
            summa={SUMMA}
            name={NAME}
            key={ID}
            onClick={handleClick({
              primaryKey: PRIMARYKEY,
              id: ID,
              tableName: TABLENAME,
              price: PRICE,
              summa: SUMMA,
            })}
          />
        )
      )}
    </ul>
  );
};
