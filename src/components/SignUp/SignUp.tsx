import { useEffect } from 'react';
import style from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { isRegistrationSuccessfullySelector } from '../../store/selectors';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RxCross1, RxLockClosed, RxPerson } from 'react-icons/rx';
import { IRegisterFormInput } from '../../types/types';

function SignUp() {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const isRegistration = useSelector(isRegistrationSuccessfullySelector);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    mode: "onChange",
  });

  const close = () => {
    navigate(`/`);
  };

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    await signUp(data);
  };

  const signInPage = () => {
    navigate(`/signin`);
  };

  const name = watch('name');
  const login = watch('login');
  const password = watch('password');

  useEffect(
    () => {
      if (isRegistration === true) {
        navigate(`/signin`);
      }
    },
    [isRegistration, navigate]
  );

  return (
    <div className={style.formScreen}>
      <div className={style.formWrapper}>
        <div className={style.closeButton} onClick={()=>{close()}}><RxCross1 /></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <div className={style.inputWrapper}>
            <RxPerson className={style.inputIcon} />
            <input
              {...register('name', {
                required: 'This is required',
                minLength: { value: 3, message: 'Min length is 3' },
              })}
              autoComplete='off'
            />
            <label className={name ? style.activeLabel : style.label}>Name</label>
            <p className={style.errors}>{errors.login?.message}</p>
          </div>
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
            Already have an account?  <span onClick={()=>{signInPage()}}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
