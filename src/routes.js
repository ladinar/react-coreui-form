import React from 'react'

//Products
const AllProducts = React.lazy(() => import('./views/products/all-products/AllProducts'))
const AddProducts = React.lazy(() => import('./views/products/add-products/AddProducts'))
const Person = React.lazy(() => import('./views/products/person/AllPerson'))

const routes = [
  { path: '/products/all-products', name: 'Produk', component: AllProducts },
  { path: '/products/add-products', name: 'Tambah Produk', component: AddProducts },
  { path: '/person/person', name: 'Person', component: Person },
]

export default routes
