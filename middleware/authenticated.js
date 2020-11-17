export default function ({
  store,
  route,
  redirect
}) {
  const user = store.state.users.user;
  const blockRoute = /\/protected\/*/g;
  const homeRout = '/'

  if (!user && route.path.match(blockRoute)) {
    redirect('/')
  }

  if (user && route.path === homeRout) {
    redirect('/protected')
  }
}
