import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';

export const Redirect = (): [(action: any) => void, (url: string) => void] => {
  const [test, setTest] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myDispatch = (action: any): void => {
    dispatch(action());
    setTest(true);
  };
  const myNavigate = (url: string): void => {
    navigate(url);
  };
  return [myDispatch, myNavigate];
};
