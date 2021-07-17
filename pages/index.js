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
import { AlurakutMenu, HeromunityLib, OrkutNostalgicIconSet } from '../lib'
import { GithubAPI } from '../services'

// color: ${({ theme }) => theme.colors.primary}
export default function Home() {
  const [ user, setUser ] = useState( null )
  const githubUser = HeromunityLib.githubUser( user?.email )
  const [ communities, setCommunities ] = useState( [] )
  const router = useRouter()
  const { handleSubmit, register } = useForm()
  const addCommunity = async form => {
    form.owner = user.uid // CODE CRITIQUE: dirt here
    Firebase.createCom( form )
  }

  useEffect( () => {
    return Firebase.setAuthChangeListener( user => {
      if( ! user ) {
        setUser( null )
        router.push( '/login' )
      } else {
        setUser( user )
      }

    })
  }, [ setUser ])

  useEffect( () => {
    if( ! user ) return

    return Firebase.listCom( user.uid ).get()
      .then( snap => {
        let communities = []

        snap.forEach( c => communities.push( { id: c.id, ...c.data() } ) )

        setCommunities( communities )
      })
  }, [ user, setCommunities ])

  return (
    <>
      <AlurakutMenu githubUser={ githubUser } />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={ githubUser } />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h2 className="title">Bem-vinde(o/a) { githubUser }</h2>
            <OrkutNostalgicIconSet
              confiavel={ 1 }
              legal={ 2 }
              sexy={ 3 }
            />
          </Box>

          <WhatUWannaDo onAdd={ addCommunity } />
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <FollowerRelations login={ githubUser } />
          <CommunityRelations communities={ communities } />
        </div>
      </MainGrid>
    </>
  )
}

// export async function getServerSideProps( context ) {
//   let uid = false
//   let storedCommunities = []
// 
//   return new Promise( function( res, rej ) {
//     return Firebase.setAuthChangeListener( async function( user ) {
//       console.debug( 'pages.index.getServerSideProps onAuthChanged', user )
//       if( ! user )
//         return res( { props: { uid, storedCommunities } } )
// 
//       uid = user.id
//       storedCommunities = await Firebase.listCom( user.uid )
// 
//       return res( { props: { uid, storedCommunities } } )
//     })
//   })
// 
//   console.debug( 'pages.index.getServerSideProps'  )
//   // const cleanAuth = Firebase.setAuthChangeListener( async function( user ) {
//   //   if ( user ) {
//   //     uid = user.uid
//   //     storedCommunities = await Firebase.listCom( user.uid )
// 
//   //     if( ! storedCommunities ) storedCommunities = []
// 
//   //     console.debug( 'pages.index.getServerSideProps storedCommunities', storedCommunities )
//   //   }
//   // })
// 
//   // return { props: { uid, storedCommunities } }
// }
