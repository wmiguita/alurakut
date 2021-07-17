import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import {
  Box,
  CommunityRelations,
  FollowerRelations,
  MainGrid,
  ProfileSidebar,
  WhatUWannaDo,
} from '../components'
import { Firebase } from '../services'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib'
import { GithubAPI } from '../services'

// color: ${({ theme }) => theme.colors.primary}
export default function Home() {
  const [ githubLogin, setGithubLogin ] = useState( null )
  const [ user, setUser ] = useState( null )
  const [ communities, setCommunities ] = useState( [] )
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  const handleUser = form => {
    setGithubLogin( form.githubLogin )
    GithubAPI.info( form.githubLogin ).then( u => setUser( u ) )
  }
  const addCommunity = community => setCommunities( [ ...communities, community ] )

  useEffect( () => {
    Firebase.setAuthChangeListener( user => {
      if( ! user ) router.push( '/login' )
    })
  }, [])
  return (
    <>
      <AlurakutMenu githubUser={ user?.login } />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar user={ user } />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            { user ?
                <h2 className="title">Bem-vinde(o/a) { user.login }</h2>
              : (
                <form className="title" onSubmit={ handleSubmit( handleUser ) }>
                  Bem-vinde(o/a)
                  <input
                    { ...register( 'githubLogin' ) }
                    placeholder="Tecle login do github"
                    aria-label="Tecle login do github"
                    type="text"
                  />
                  <button type="submit" disabled={ !!user }>OK</button>
                </form>
              )
            }
            <OrkutNostalgicIconSet
              confiavel={ 1 }
              legal={ 2 }
              sexy={ 3 }
            />
          </Box>

          <WhatUWannaDo onAdd={ addCommunity } />
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <FollowerRelations login={ user?.login } />
          <CommunityRelations communities={ communities } />
        </div>
      </MainGrid>
    </>
  )
}

