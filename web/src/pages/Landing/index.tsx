import React from 'react'
import { Link } from 'react-router-dom'

import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../../images/logo.svg'

import './styles.css'

const Landing = () => {
    return (
        <div id='page-landing'>
            <div className='content-wrapper'>
                <div className='header'>
                    <img src={logoImg} alt='Happy' />

                    <div className='location'>
                        <strong>São Bernardo do Campo</strong>
                        <span>São Paulo</span>
                    </div>
                </div>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <Link to='/dashboard' className='access'>
                    Acesso restrito
                </Link>

                <Link to='/app' className='enter-app'>
                    <FiArrowRight size={26} color="#00000099" />
                </Link>
            </div>
        </div>
    )
}

export default Landing
