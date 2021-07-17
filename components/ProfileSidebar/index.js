import React from 'react'

import { Box } from '../'
import { AlurakutProfileSidebarMenuDefault } from '../../lib'

export const ProfileSidebar = ({ githubUser }) => {
  if ( ! githubUser ) return null

  return (
    <Box>
      <img src={ `https://github.com/${ githubUser }.png` } className="avatar" /><br />
      <p>
        <a className="boxLink" href={ `https://github.com/${ githubUser }` }>@{ githubUser }</a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default ProfileSidebar

