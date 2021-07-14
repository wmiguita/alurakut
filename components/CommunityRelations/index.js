import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileRelationsBox from '../ProfileRelations';
import { GithubAPI } from '../../services';

export const CommunityRelations = ({ communities }) => {
  const emptyCommunities = () => <div>Sem comunidades......ainda ;D</div>;
  const renderCommunity = community => (
    <li key={ community.id }>
      <a href={ community.url } >
        <img alt={ `profile image of community ${ community.name }` } src={ community.image_url } />
        <span>{ community.name }</span>
      </a>
    </li>
  );

  return (
    <ProfileRelationsBox>
      <h2 className="smallTitle">Comunidades ({ communities.length })</h2>
      {
        communities?.length ?
        <ul className="communities-relations">{ communities.map( renderCommunity ) }</ul> :
        emptyCommunities()
      }
    </ProfileRelationsBox>
  )
}

CommunityRelations.propTypes = {
  communities: PropTypes.array, //should be array of github login name
}
export default CommunityRelations;
