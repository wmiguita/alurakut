import React, { useEffect, useState } from 'react';
import {
  Box,
  MainGrid,
  ProfileRelationsBoxWrapper,
} from '../components';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons';
import { GithubAPI } from '../services';

// color: ${({ theme }) => theme.colors.primary};
export default function Home() {
  const login = 'joellobo';
  const [ user, setUser ] = useState();

  useEffect( () => {
    if ( user ) return;
    return GithubAPI.info( login )
      .then( json => setUser( json ) )
  }, [ setUser ] );

  if ( ! user )
    return <div>Loading user profile...</div>;

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <Box>
            <img src={ user.avatar_url } className="avatar" />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinde(o/a)</h1>

            <OrkutNostalgicIconSet
              confiavel={ Math.random() * 3 }
              legal={ Math.random() * 3 }
              sexy={ Math.random() * 3 }
            />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper login={ login } />
          <Box>
            profileRelationsArea Box2
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
