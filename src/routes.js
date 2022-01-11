import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Genres = React.lazy(() => import('./views/movie/genres/Genres'))
const List = React.lazy(() => import('./views/movie/list/List'))
const Detail = React.lazy(() => import('./views/movie/detail/Detail'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/movie', name: 'Movie', component: Genres, exact: true },
  { path: '/movie/genres', name: 'Genres', component: Genres },
  { path: '/movie/list', name: 'List', component: List },
  { path: '/movie/detail', name: 'Detail', component: Detail },
]

export default routes
