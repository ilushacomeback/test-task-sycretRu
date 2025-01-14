import React from 'react';
import * as styled from './cardItem.module.css';

export const CardItem = ({ price, name, onClick, discount, summa }) => {
  const normalizePrice = summa.split('.')[0];
  const normalizeDiscount = discount.split('.')[0] + '%';
  return (
    <li className={styled.card} onClick={onClick}>
      <h1>{name.toUpperCase()}</h1>
      <span>Скидка - {normalizeDiscount}</span>
      <span>Цена - {normalizePrice} руб</span>
      <button>Купить</button>
    </li>
  );
};
