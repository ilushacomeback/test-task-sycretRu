import React, { useEffect, useState, useContext } from 'react';
import { getDataFromServer } from '@/api/getData';
import { CardItem } from '../cardItem/CardItem';
import * as styled from './cards.module.css';
import { staticRoutes } from '@/routes/routes';
import { useNavigate } from 'react-router';
import storeContext from '@/context/StoreContext';

const items = [
  { price: 100, id: '1', name: 'one' },
  { price: 200, id: '2', name: 'two' },
  { price: 300, id: '3', name: 'three' },
  { price: 400, id: '4', name: 'four' },
  { price: 500, id: '5', name: 'five' },
  { price: 600, id: '6', name: 'six' },
  { price: 700, id: '7', name: 'seven' },
  { price: 800, id: '8', name: 'eight' },
];

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
        setDataFromServer(items);
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
