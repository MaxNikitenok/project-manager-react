import { useEffect, useState } from 'react';
import style from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { isRegistrationSuccessfullySelector } from '../../store/selectors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RxCross1, RxEyeOpen, RxEyeNone, RxPerson } from 'react-icons/rx';
import { IRegisterFormInput } from '../../types/types';
import { motion, AnimatePresence } from 'framer-motion';

function SignUp() {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const isRegistration = useSelector(isRegistrationSuccessfullySelector);

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const [isVisible, setVisible] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    mode: 'onChange',
  });

  const close = () => {
    navigate(`/`);
  };

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    await signUp(data);
  };

  const moveToSignInPage = () => navigate(`/signin`);


  const signInPage = () => {
    setVisible(false);
    setTimeout(moveToSignInPage, 300);
  };

  const name = watch('name');
  const login = watch('login');
  const password = watch('password');

  useEffect(() => {
    if (isRegistration === true) {
      navigate(`/signin`);
    }
  }, [isRegistration, navigate]);

  return (
    <div className={style.formScreen}>
      <AnimatePresence>
        {isVisible && (<motion.div
          className={style.formWrapper}
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: [-1000, 50, 0] }}
          exit={{ opacity: 0, x: -1000 }}
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
            <h2>Register</h2>
            <div className={style.inputWrapper}>
              <RxPerson className={style.inputIcon} />
              <input
                {...register('name', {
                  required: 'This is required',
                  minLength: { value: 3, message: 'Min length is 3' },
                })}
                autoComplete="off"
              />
              <label className={name ? style.activeLabel : style.label}>
                Name
              </label>
              <p className={style.errors}>{errors.login?.message}</p>
            </div>
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
                Already have an account?{' '}
                <span
                  onClick={() => {
                    signInPage();
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </motion.div>)}
      </AnimatePresence>
    </div>
  );
}

export default SignUp;
