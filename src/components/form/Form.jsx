import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { staticRoutes } from '../../routes/routes';
import InputMask from 'react-input-mask';
import * as styled from './form.module.css';
import { validateForm } from '@/utils/validateForm';
import storeContext from '@/context/StoreContext';

export const Form = () => {
  const [statePhone, setStatePhone] = useState('+7 (___) ___-__-__');
  const [errors, setErrors] = useState(null);
  const { handleSetData, resetData, data } = useContext(storeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.id) {
      navigate(staticRoutes.base);
    }
  }, [data.id]);

  const handleExit = () => {
    resetData();
    navigate(staticRoutes.base);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { target } = e;
      const data = {
        clientName: target.name.value,
        phone: target.phone.value.match(/[0-9]/g).join('').slice(1),
        email: target.email.value,
      };
      await validateForm(data);
      handleSetData(data);
      setErrors(null);
      navigate(staticRoutes.pay);
    } catch (e) {
      setErrors(JSON.parse(e.message));
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styled.form} noValidate>
      <div>
        {errors?.name && <div className={styled.error}>{errors.name}</div>}
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          placeholder="Ваше имя..."
          aria-invalid={errors?.name}
        />
      </div>
      <div>
        {errors?.phone && <div className={styled.error}>{errors.phone}</div>}
        <label htmlFor="phone">Телефон</label>
        <InputMask
          mask={'+7 (999) 999-99-99'}
          value={statePhone}
          onChange={(e) => setStatePhone(e.target.value)}
        >
          {() => <input type="text" id="phone" aria-invalid={errors?.phone} />}
        </InputMask>
      </div>
      <div>
        {errors?.email && <div className={styled.error}>{errors.email}</div>}
        <label htmlFor="email">Почта</label>
        <input
          type="email"
          id="email"
          placeholder="Ваша почта..."
          aria-invalid={errors?.email}
        />
      </div>
      <div className={styled.buttons}>
        <button type="button" className={styled.exitBtn} onClick={handleExit}>
          Назад
        </button>
        <button type="submit" className={styled.buyBtn}>
          Оплатить
        </button>
      </div>
    </form>
  );
};
