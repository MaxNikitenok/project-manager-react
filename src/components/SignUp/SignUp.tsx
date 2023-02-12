import { useEffect, useState } from 'react';
import style from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { isRegistrationSuccessfullySelector } from '../../store/selectors';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [signUp] = useSignUpMutation();
  const isRegistration = useSelector(isRegistrationSuccessfullySelector)

  const close = () => {
    navigate(`/`);
  };

  useEffect(
    () => {
      if (isRegistration === true) {
        navigate(`/signin`);
      }
    },
    [isRegistration]
  );

  const U = async () => {
    await signUp({
      name: name,
      login: login,
      password: password,
    });
  };

  return (
    <div className={style.dialogExample}>
        <div className={style.bg}>
          <div className={style.popup}>
            <div className={style.signUp}>
              <div>Name</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <button onClick={U}>SIGN UP</button>
            </div>
            <button onClick={close}>Close</button>
          </div>
        </div>
    </div>
  );
}

export default SignUp;
