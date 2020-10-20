import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import logoImg from '../../images/logo-2.svg'

import api from '../../services/api'

import './styles.css'

const RedefinePassword: React.FC = () => {
    const history = useHistory()

    const [password, setPassword] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => setDisabled(!password), [password])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        api.post('redefine/password', { password })
        history.push('/login')
    }

    return (
        <div id='redefine-password'>
            <div className='content-wrapper'>
                <img src={logoImg} alt='Happy' />

                <div className='location'>
                    <strong>São Bernardo do Campo</strong>
                    <span>São Paulo</span>
                </div>
            </div>

            <main>
                <form onSubmit={handleSubmit} className='redefine-password-form'>
                    <fieldset>
                        <legend>Redefinição de senha</legend>

                        <p>Escolha uma nova senha para você acessar o dashboard do Happy.</p>

                        <div className='input-block'>
                            <label htmlFor='about'>Nova senha</label>
                            <input id='password' name='password' type='password' autoComplete='new-password' maxLength={255} value={password} onChange={e => setPassword(e.target.value)} />
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

export default RedefinePassword
