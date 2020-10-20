import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../images/logo-2.svg'

import api from '../../services/api'

import './styles.css'

const ForgotPassword: React.FC = () => {
    const history = useHistory()

    const [email, setEmail] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => setDisabled(!email), [email])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        api.post('forgot/password', { email })
        history.push('/login')
    }

    return (
        <div id='forgot-password'>
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

                <form onSubmit={handleSubmit} className='forgot-password-form'>
                    <fieldset>
                        <legend>Esqueci a senha</legend>

                        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} />
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

export default ForgotPassword
