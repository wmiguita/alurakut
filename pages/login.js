import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Link, HeromunityLib } from '../lib'
import { Firebase } from '../services'

export default function LoginScreen({ isAuth }) {
  const { handleSubmit, register } = useForm()
  const router = useRouter()
  const handleLogin = form => {
    const { githubUser, password } = form
    const email = HeromunityLib.email( githubUser )

    Firebase.login({ email, password })
      .catch( e => console.error( e ) )
  }

  useEffect( () => {
    // BUG: possible that there are multiple redirects per component that set listener
    return Firebase.setAuthChangeListener( user => {
      if( user ) router.push( '/' )
    })
  }, [])
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <p><strong>Conecte-se</strong> aos seus super amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus super amigos e ligas</p>
          <p><strike><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</strike></p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={ handleSubmit( handleLogin ) }>
            <p>
              Acesse agora mesmo com seu usuário que você cadastrou!
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
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <Link href="/subscribe">
                <strong>
                  ENTRAR JÁ
              </strong>
              </Link>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
