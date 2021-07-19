import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { Box } from '../'
import { Firebase } from '../../services'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const initialImgOpts = [ 1000, 2000, 3000 ]
const schema = yup.object().shape({
  name: yup.string().required( 'Nome da liga é obrigatório' ),
  image_url: yup.string().required( 'Escolha uma imagem para a liga' ).nullable(),
});

export const WhatUWannaDo = ({ ownerId }) => {
  const { formState: { errors }, handleSubmit, register, reset } = useForm({
    resolver: yupResolver( schema )
  })
  const [ submitting, setSubmitting ] = useState( false )
  const [ imgOpts, setImgOpts ] = useState( initialImgOpts )
  const handleWhat = data => {

    if( ! data.name ) {
      alert( 'Favor inserir nome da comunidade' )
      return
    }
    setSubmitting( true )

    const newCommunity = {
      ...data,
      owner: ownerId
    }

    return Firebase.createCom( newCommunity )
      .catch( e => alert( e.message ) )
      .finally( () => {
        setSubmitting( false )
        reset()
      })
  }
  const changeOptions = () => {
    const randSeed = () => parseInt( Math.random() * 1000 )

    setImgOpts([ randSeed(), randSeed(), randSeed() ])
  }

  return (
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={ handleSubmit( handleWhat ) }>
        <div>
          <input
            { ...register( 'name' ) }
            type="text"
            placeholder="Qual o nome da liga para ser criada?"
            aria-label="Qual o nome da liga para ser criada?"
          />
        </div>
        <div>
          <h3 className="smallTitle">Qual a imagem que melhor representa a liga?</h3>
        </div>
          { imgOpts.map( img => {
              const src = `https://picsum.photos/seed/${ img }/100/100`

              return (
                <label key={ img } className="radioLabel">
                  { img ? 
                      <img src={ src } 
                        height="100"
                        width="100"
                        alt={ `random image generated from picsum with seed ${ img }` } />
                    : null
                  }
                  <input { ...register( 'image_url' ) } value={ src } type="radio"/>
                </label>
              )
            })
          }
        <a onClick={ changeOptions }>Trocar imagens</a>
        <br />
        <button type="submit" disabled={ submitting }>Criar liga</button>
        <ul className="errors">
          { [ 'name', 'image_url' ].map( ( field, i ) => <li key={ i }>{ errors[ field ]?.message }</li> ) }
        </ul>
      </form>
    </Box>
  )
}

WhatUWannaDo.propTypes = {
  ownerId: PropTypes.string
}
export default WhatUWannaDo
