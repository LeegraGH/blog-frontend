import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../../redux/slices/auth';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Registration = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => Boolean(state.auth.data));
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (data.payload!==undefined) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось зарегистрироваться!');
    }
  }

  if (isAuth){
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField className={styles.field} label="Полное имя" fullWidth
        {...register('fullName', {required: "Укажите имя"})}
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        />
        <TextField className={styles.field} label="E-Mail" fullWidth 
        {...register('email', {required: "Укажите почту"})}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        />
        <TextField className={styles.field} label="Пароль" fullWidth 
        {...register('password', {required: "Укажите пароль"})}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
