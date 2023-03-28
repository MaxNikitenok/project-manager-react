import { useEffect, useState } from 'react';
import style from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import {
  isAuthorizedSelector,
  isRegistrationSuccessfullySelector,
} from '../../store/selectors';
import { useDispatch } from 'react-redux';
import {
  resetIsRegistrationSuccessfully,
  setUserLogin,
} from '../../store/userSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RxCross1, RxEyeOpen, RxEyeNone, RxPerson } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';

interface IFormInput {
  login: string;
  password: string;
}

export const SignIn = () => {
  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);
  const dispatch = useDispatch();
  const isRegistration = useSelector(isRegistrationSuccessfullySelector);

  const [signIn] = useSignInMutation();

  const [isVisible, setVisible] = useState(true);

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await signIn(data);
    dispatch(setUserLogin(data.login));
  };

  const close = () => {
    navigate(`/`);
  };

  const moveToRegisterPage = () => navigate(`/signup`)

  const registerPage = () => {
    setVisible(false);
    setTimeout(moveToRegisterPage, 300);
  };

  const login = watch('login');
  const password = watch('password');

  useEffect(() => {
    if (authorized === true) {
      navigate(`/`);
    }
    if (isRegistration === true) {
      dispatch(resetIsRegistrationSuccessfully());
    }
  }, [authorized, dispatch, isRegistration, navigate]);

  return (
    <div className={style.formScreen}>
      <AnimatePresence>
        {isVisible && (<motion.div
          className={style.formWrapper}
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: [1000, -50, 0] }}
          exit={{ opacity: 0, x: 1000 }}
          transition={{
            duration: 0.3,
          }}
        >
          <div
            className={style.closeButton}
            onClick={() => {
              close();
            }}
          >
            <RxCross1 />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div className={style.inputWrapper}>
              <RxPerson className={style.inputIcon} />
              <input
                {...register('login', {
                  required: 'This is required',
                  minLength: { value: 3, message: 'Min length is 3' },
                })}
                autoComplete="off"
              />
              <label className={login ? style.activeLabel : style.label}>
                Login
              </label>
              <p className={style.errors}>{errors.login?.message}</p>
            </div>
            <div className={style.inputWrapper}>
              <div onClick={() => setPasswordHidden(!isPasswordHidden)}>
                {isPasswordHidden ? (
                  <RxEyeNone className={style.inputIcon} />
                ) : (
                  <RxEyeOpen className={style.inputIcon} />
                )}
              </div>
              <input
                {...register('password', {
                  required: 'This is required',
                  minLength: { value: 3, message: 'Min length is 3' },
                })}
                autoComplete="off"
                type={isPasswordHidden ? 'password' : 'text'}
              />
              <label className={password ? style.activeLabel : style.label}>
                Password
              </label>
              <p className={style.errors}>{errors.password?.message}</p>
            </div>

            <input className={style.submitButton} type="submit" value="ENTER" />
            <div className={style.register}>
              <p>
                Do not have an account?{' '}
                <span
                  onClick={() => {
                    registerPage();
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </motion.div>)}
      </AnimatePresence>
    </div>
  );
};
