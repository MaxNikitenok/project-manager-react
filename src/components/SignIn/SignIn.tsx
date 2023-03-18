import { useEffect, useState } from 'react';
import style from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../store/userSlice';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { RxLockClosed, RxPerson } from 'react-icons/rx';

interface IFormInput {
  login: string;
  password: string;
}

export const SignIn = () => {
  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);
  const dispatch = useDispatch();

  const [signIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await signIn(data);
    dispatch(setUserLogin(data.login));
  };

  const close = () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (authorized === true) {
      navigate(`/`);
    }
  }, [authorized, navigate]);

  return (
    <div className={style.formScreen}>
      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputBox}>
            <RxPerson />
            <input
              {...register('login', {
                required: 'This is required',
                minLength: { value: 3, message: 'Min length is 3' },
              })}
              />
              <label>Login</label>
            <p>{errors.login?.message}</p>
          </div>
          <div className={style.inputBox}>
            <RxLockClosed />
            <input
              {...register('password', {
                required: 'This is required',
                minLength: { value: 3, message: 'Min length is 3' },
              })}
              />
              <label>Password</label>
            <p>{errors.password?.message}</p>
          </div>

          <input type="submit" value="ENTER" />
          <div className={style.register}>
              <p>Do not have an account? <span><b>Register</b></span></p>
          </div>
        </form>
      </div>
    </div>
  );
};
