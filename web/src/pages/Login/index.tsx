import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Location } from 'history'

import { FiArrowLeft } from 'react-icons/fi'

import { useAuth } from '../../contexts/auth'

import logoImg from '../../images/logo-2.svg'

import './styles.css'

const Login: React.FC = () => {
    const { signIn } = useAuth()

    const history = useHistory()
    const location = useLocation<{ from: Location }>()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)

    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        setDisabled(!email || !password)
    }, [email, password])

    // TODO: Prevent signIn to be called multiple times
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        signIn({ email, password }, remember)
            .then(() => history.push(location.state.from ?? { pathname: '/app' }))
    }

    return (
        <div id='login'>
            <div className='content-wrapper'>
                <img src={logoImg} alt='Happy' />

                <div className='location'>
                    <strong>São Bernardo do Campo</strong>
                    <span>São Paulo</span>
                </div>
            </div>

            <main>
                <Link to='' className='back'>
                    <FiArrowLeft size={20} color='#15C3D6' />
                </Link>

                <form onSubmit={handleSubmit} className='login-form'>
                    <fieldset>
                        <legend>Fazer login</legend>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Senha</label>
                            <input id='password' name='password' type='password' autoComplete='current-password' maxLength={255} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <div className="check-block">
                                <input type="checkbox" name='remember' id='remember' checked={remember} onChange={e => setRemember(e.target.checked)} />
                                <label htmlFor='remember'>Lembrar-me</label>
                            </div>

                            <Link to="/forgot/password">
                                Esqueci minha senha
                            </Link>
                        </div>
                    </fieldset>

                    <button disabled={disabled} className='confirm-button' type='submit'>
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Login
