import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';
import { GithubAPI } from '../../services';

const ProfileRelationsBox = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`

export const ProfileRelationsBoxWrapper = ({ title, login }) => {
  const [ relations, setRelations ] = useState([]);
  const emptyRelations = () => <div>No relation profiles found...</div>;
  const renderProfile = profile => (
    <li key={ profile.login }>
      <a href={ profile.url } >
        <img alt={ `profile image of ${ profile.login }` } src={ profile.avatar_url } />
        <span>{ profile.login }</span>
      </a>
    </li>
  );

  useEffect( () => {
    if ( relations?.length ) return

    GithubAPI.followers( login ).then( json => setRelations( json ) );
  }, [ setRelations ])

  return (
    <ProfileRelationsBox>
      <h2 className="smallTitle">Pessoas relacionadas ({ relations.length })</h2>
      {
        relations?.length ?
        <ul className="profile-relations">{ relations.map( renderProfile ) }</ul> :
        emptyRelations()
      }
    </ProfileRelationsBox>
  )
}

ProfileRelationsBoxWrapper.propTypes = {
  login: PropTypes.string, //should be array of github login name
}
export default ProfileRelationsBoxWrapper;
