
const Options = ( request, response ) => {
  response.status( 200 ).json({ method: 'options' })
}
const Post = ( request, response ) => {
  response.status( 200 ).json({ method: 'post' })
}

const Get = ( request, response ) => {
  response.status( 200 ).json({ method: 'get' })
}
const MethodResponse = {
  'OPTIONS': Options,
  'GET': Get,
  'POST': Post,
}
const Layer = async ( request, response ) => {
  const execFn = MethodResponse[ request.method ]

  return execFn ? execFn( request, response )
    : response.status( 400 ).json({ message: "Can't touch this..." })
}
export default Layer
