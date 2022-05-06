import React from 'react';
import img from '../../assets/image/photo_2019-06-02_21-11-17.jpg';
import Logo from '../../assets/image/logo.svg';
import style from './App.module.scss';

export const App = () => {
  return (
    <div>
      <Logo />
      <h2 className={style.superClass}>Vehicles</h2>
      <p className="desc">Description</p>
      <img src={img} alt="image" />
    </div>
  );
};
