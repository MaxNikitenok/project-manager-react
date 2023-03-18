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
import { RxCross1, RxLockClosed, RxPerson } from 'react-icons/rx';

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
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await signIn(data);
    dispatch(setUserLogin(data.login));
  };

  const close = () => {
    navigate(`/`);
  };

  const registerPage = () => {
    navigate(`/signup`);
  };

  const login = watch('login');
  const password = watch('password');

  useEffect(() => {
    if (authorized === true) {
      navigate(`/`);
    }
  }, [authorized, navigate]);

  return (
    <div className={style.formScreen}>
      <div className={style.formWrapper}>
        <div className={style.closeButton} onClick={()=>{close()}}><RxCross1 /></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className={style.inputWrapper}>
            <RxPerson className={style.inputIcon} />
            <input
              {...register('login', {
                required: 'This is required',
                minLength: { value: 3, message: 'Min length is 3' },
              })}
              autoComplete='off'
            />
            <label className={login ? style.activeLabel : style.label}>Login</label>
            <p className={style.errors}>{errors.login?.message}</p>
          </div>
          <div className={style.inputWrapper}>
            <RxLockClosed className={style.inputIcon} />
            <input
              {...register('password', {
                required: 'This is required',
                minLength: { value: 3, message: 'Min length is 3' },
              })}
              autoComplete='off'
            />
            <label className={password ? style.activeLabel : style.label}>Password</label>
            <p className={style.errors}>{errors.password?.message}</p>
          </div>

          <input className={style.submitButton} type="submit" value="ENTER" />
          <div className={style.register}>
            <p>
              Do not have an account? <span onClick={()=>{registerPage()}}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
