const API_URL = 'https://api.github.com';
const USERS = 'users';
const FOLLOWERS = 'followers';


export class GithubAPI {
  static info( profile ) {
    const url = new URL( `${ USERS }/${ profile }`, API_URL );

    return fetch( url.href )
      .then( response => response.json() );
  }

  static followers( profile ) {
    const url = new URL( `${ USERS }/${ profile }/${ FOLLOWERS }`, API_URL );

    return fetch( url.href )
      .then( response => response.json() );
  }
}
