import React, { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Box } from '../';

const initialImgOpts = [ 1000, 2000, 3000 ];

export const WhatUWannaDo = ({ onAdd }) => {
  const { handleSubmit, register, reset } = useForm();
  const [ imgOpts, setImgOpts ] = useState( initialImgOpts );
  const handleWhat = data => {
    if( typeof onAdd !== 'function' ) return;

    reset();

    return onAdd({
      id: uuidv4(),
      name: data.communityName,
      image_url: data.communityImage,
    });
  }
  const changeOptions = () => {
    const randSeed = () => parseInt( Math.random() * 1000 );

    setImgOpts([ randSeed(), randSeed(), randSeed() ]);
  }

  return (
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={ handleSubmit( handleWhat ) }>
        <div>
          <input
            { ...register( 'communityName' ) }
            type="text"
            placeholder="Qual o nome da comunidade para ser criada?"
            aria-label="Qual o nome da comunidade para ser criada?"
          />
        </div>
        <div>
          <h3 className="smallTitle">Qual a imagem que melhor representa a comunidade?</h3>
        </div>
          { imgOpts.map( img => {
              const src = `https://picsum.photos/seed/${ img }/100/100`;

              return (
                <label key={ img } className="radioLabel">
                  { img ? 
                      <img src={ src } 
                        height="100"
                        width="100"
                        alt={ `random image generated from picsum with seed ${ img }` } />
                    : null
                  }
                  <input { ...register( 'communityImage' ) } value={ src } type="radio"/>
                </label>
              )
            })
          }
        <a onClick={ changeOptions }>Trocar imagens</a>
        <br />
        <button type="submit">Criar comunidade</button>
      </form>
    </Box>
  )
};

export default WhatUWannaDo;
