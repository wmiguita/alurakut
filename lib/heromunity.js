export class HeromunityLib {
  static email( githubUser ) {
    return `${ githubUser }@heromunity.com`
  }

  static githubUser( email ) {
    if( ! email ) return null
    return email.split( '@' )[ 0 ]
  }
}
