import classNames from 'classnames';
import { Button, ButtonTheme } from 'components/Button';
import { TextInput } from 'components/Fields/TextInput/TextInput';
import { apiClassic } from 'config/axios';
import { LocalStorageTokenKey } from 'constans/localStorage';
import { PropsWithChildren, useState } from 'react';
import UserStore from 'User';
import cls from './AuthByName.module.scss';

interface AuthByNameProps {
    className?: string;
}

export type AuthType = 'registration' | 'login';

export const AuthByName = (props: PropsWithChildren<AuthByNameProps>) => {
    const { className } = props;

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [authType, setAuthType] = useState<AuthType>('login');
    const [error, setError] = useState('');

    const onLogin = async () => {
        setError('');
        if (name && password) {
            try {
                const res = await apiClassic.post(`/auth/${authType}`, { name, password });
                if (res.data) {
                    UserStore.setUser(res.data.user);
                    localStorage.setItem(LocalStorageTokenKey, res.data.accessToken);
                } else throw new Error();
            } catch (e) {
                setError('Bad request');
            }
        } else {
            setError('Fill all fields');
        }
    };

    const onToggleAuthType = () => {
        setAuthType(authType === 'login' ? 'registration' : 'login');
    };

    return (
        <div className={classNames(className, cls.AuthByName)}>
            <h2 className={cls.title}>{authType}</h2>
            <label>
                <span>Username</span>
                <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <span>Password</span>
                <TextInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div className={cls.footer}>
                {error && <p>{error}</p>}
                <Button onClick={onLogin}>{authType === 'login' ? 'Sign In' : 'Sign Up'}</Button>
            </div>
            <Button theme={ButtonTheme.Clear} className={cls.authType} onClick={onToggleAuthType}>
                {authType === 'login' ? 'registration' : 'login'}
            </Button>
        </div>
    );
};
