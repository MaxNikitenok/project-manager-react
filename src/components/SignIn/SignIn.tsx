import { useEffect, useState } from 'react';
import style from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { isAuthorizedSelector } from '../../store/selectors';

function SignIn() {
  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [signIn] = useSignInMutation();

  const I = async () => {
    await signIn({
      login: login,
      password: password,
    });
  };

  const close = () => {
    navigate(`/`);
  };

  useEffect(
    () => {
      if (authorized === true) {
        navigate(`/boards`);
      }
    },
    [authorized, navigate],
  );  

  return (
    <div className={style.dialogExample}>
      <div className={style.bg}>
        <div className={style.popup}>
          <div className={style.signIn}>
            <div>Login</div>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <div>Password</div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={I}>SIGN IN</button>
          </div>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
