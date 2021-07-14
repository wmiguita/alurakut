import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  CommunityRelations,
  FollowerRelations,
  MainGrid,
  ProfileSidebar,
  WhatUWannaDo,
} from '../components';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib';
import { GithubAPI } from '../services';

// color: ${({ theme }) => theme.colors.primary};
export default function Home() {
  const [ githubLogin, setGithubLogin ] = useState( null );
  const [ user, setUser ] = useState( null );
  const { handleSubmit, register } = useForm();
  const getUser = form => GithubAPI.info( form.githubLogin ).then( u => setUser( u ) )

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar user={ user } />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            { user ?
                <h2 className="title">Bem-vinde(o/a) { user.login }</h2>
              : (
                <form className="title" onSubmit={ handleSubmit( getUser ) }>
                  Bem-vinde(o/a)
                  <input
                    { ...register( 'githubLogin' ) }
                    placeholder="Tecle login do github"
                    aria-label="Tecle login do github"
                  />
                  <button type="submit" disabled={ !!user }>OK</button>
                </form>
              )
            }
            <OrkutNostalgicIconSet
              confiavel={ Math.random() * 3 }
              legal={ Math.random() * 3 }
              sexy={ Math.random() * 3 }
            />
          </Box>

          <WhatUWannaDo />
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <FollowerRelations login={ user?.login } />
          <CommunityRelations communities={ [{ id: '0', name: 'teste', image_url: 'https://picsum.photos/200/300' }] } />
        </div>
      </MainGrid>
    </>
  )
};

