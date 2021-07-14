import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileRelationsBox from '../ProfileRelations';
import { GithubAPI } from '../../services';

export const FollowerRelations = ({ title, login }) => {
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
    if ( ! login || relations?.length ) return

    GithubAPI.followers( login ).then( json => setRelations( json ) );
  }, [ login, setRelations ])

  return (
    <ProfileRelationsBox>
      <h2 className="smallTitle">Seguidores ({ relations.length })</h2>
      {
        relations?.length ?
        <ul className="profile-relations">{ relations.map( renderProfile ) }</ul> :
        emptyRelations()
      }
    </ProfileRelationsBox>
  )
}

FollowerRelations.propTypes = {
  login: PropTypes.string, //should be array of github login name
}
export default FollowerRelations;
