import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { HeromunityLib, Link } from '../lib'
import { Firebase } from '../services'

export default function SubscribeScreen() {
  const [ submitting, setSubmitting ] = useState( false )
  const { handleSubmit, register } = useForm()
  const router = useRouter()
  const handleSub = form => {
    const { githubUser, password } = form
    const email = HeromunityLib.email( githubUser )

    setSubmitting( true )
    Firebase.subscribe({ email, password })
      .catch( e => alert( e.message ) )
      .finally( () => setSubmitting( false ) )
  }

  useEffect( () => {
    // BUG: possible that there are multiple redirects per component that set listener
    return Firebase.setAuthChangeListener( user => {
      if( user ) router.push( '/' )
    })
  }, [])

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="subscribeScreen">
        <section className="logoArea">
          <p><strong>Conecte-se</strong> aos seus super amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus super amigos e ligas</p>
          <p><strike><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</strike></p>
          <p><strong>Qualquer semelhança</strong> não é qualquer deprivação de sono =)</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={ handleSubmit( handleSub ) }>
            <p>
              Cadastre agora o email que quiser (identidade secreta ou heróico)
            </p>
            <input
              { ...register( "githubUser" ) }
              placeholder="Github login"
              aria-label="Github login"
              type="text"
            />
            <input
              { ...register( "password" ) }
              placeholder="Senha"
              aria-label="Serha"
              type="password"
              autoComplete="false"
            />
            <button type="submit" disabled={ submitting }>Cadastrar</button>
          </form>

          <footer className="box">
            <p>
              Já é membro? <br />
              <Link href="/login">
                <strong>
                  LOGIN JÁ
                </strong>
              </Link>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            <strike>
              © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
            </strike>
          </p>
        </footer>
      </div>
    </main>
  )
} 
