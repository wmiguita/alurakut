import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { Firebase } from '../services'

export default function LogoutAction() {
  const router = useRouter()

  useEffect( () => {
    return Firebase.setAuthChangeListener( ( user ) => {
        ( ! user ) ? router.push( '/login' ) : null
      })
  }, [] )
  Firebase.logout()

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        Jogando os cookies para de baixo do tapete...
      </div>
    </main>
  )
}
