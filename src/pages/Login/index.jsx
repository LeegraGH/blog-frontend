import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import {fetchAuth} from "../../redux/slices/auth";

export const Login = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => Boolean(state.auth.data));
  const { register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (data.payload!==undefined) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось авторизоваться!');
    }
  }

  if (isAuth){
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }} >
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register('email', { required: "Укажите почту" })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
        />
        <TextField className={styles.field} label="Пароль" fullWidth
          {...register('password', { required: "Укажите пароль" })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
        />
        <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
          Войти
        </Button>
      </form>
    </Paper>
  );
};
