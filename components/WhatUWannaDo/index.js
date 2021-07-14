import React from 'react';
import { useForm } from 'react-hook-form';

import { Box } from '../';

export const WhatUWannaDo = () => {
  const { handleSubmit, register } = useForm();
  const handleWhat = data => {
    console.debug( 'components.WhatUWannaDo handleWhat data', data );
  }

  return (
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={ handleSubmit( handleWhat ) }>
        <div>
          <input
            { ...register( 'communityName' ) }
            placeholder="Qual o nome da comunidade para ser criada?"
            aria-label="Qual o nome da comunidade para ser criada?"
          />
        </div>
        <div>
          <input
            { ...register( 'communityImage' ) }
            placeholder="Qual a imagem que melhor representa a comunidade?"
            aria-label="Qual a imagem que melhor representa a comunidade?"
          />
        </div>
        <button type="submit">Criar comunidade</button>
      </form>
    </Box>
  )
};

export default WhatUWannaDo;
