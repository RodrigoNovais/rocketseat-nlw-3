import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import { useAuth } from '../../contexts/auth'

import logoImg from '../../images/logo-2.svg'

import './styles.css'

const Register: React.FC = () => {
    const { register } = useAuth()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        setDisabled(!email || !password)
    }, [email, password])

    // TODO: Prevent register to be called multiple times
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        register({ name, email, password })
    }

    return (
        <div id='register'>
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

                <form onSubmit={handleSubmit} className='register-form'>
                    <fieldset>
                        <legend>Fazer login</legend>

                        <div className='input-block'>
                            <label htmlFor='email'>Name</label>
                            <input id='name' name='name' autoComplete='name' maxLength={255} value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' name='email' autoComplete='email' maxLength={255} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Senha</label>
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

export default Register
