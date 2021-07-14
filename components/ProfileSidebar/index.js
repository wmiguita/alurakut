import React from 'react';

import { Box } from '../';
import { AlurakutProfileSidebarMenuDefault } from '../../lib';

export const ProfileSidebar = ({ user }) => {
  if ( ! user ) return null;

  return (
    <Box>
      <img src={ user.avatar_url } className="avatar" /><br />
      <p>
        <a className="boxLink" href={ user.url }>@{ user.login }</a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
};

export default ProfileSidebar;

