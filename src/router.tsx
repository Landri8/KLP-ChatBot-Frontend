import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import ProductsScreen from './screens/ProductsScreen'
import SolutionsScreen from './screens/SolutionsScreen'
import BlogScreen from './screens/BlogScreen'
import TestimonialsScreen from './screens/TestimonialsScreen'
import ContactScreen from './screens/ContactScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import AdminLoginScreen from './screens/admin/AdminLoginScreen'
import GuestMiddleware from './middlewares/GuestMiddleware'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AdminWelcomeScreen from './screens/admin/AdminWelcomeScreen'
import AdminCustomerQueriesListScreen from './screens/admin/AdminCustomerQueriesListScreen'
import AdminCustomerQueryDetailsScreen from './screens/admin/AdminCustomerQueryDetailsScreen'
import AdminUserListScreen from './screens/admin/AdminUserListScreen'
import AdminUserDetailsScreen from './screens/admin/AdminUserDetailsScreen'
import AdminUserCreationScreen from './screens/admin/AdminUserCreationScreen'
import AdminProfileScreen from './screens/admin/AdminProfileScreen'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' Component={HomeScreen} />
      <Route path='/aboutus' Component={AboutScreen} />
      <Route path='/products' Component={ProductsScreen} />
      <Route path='/products/details' Component={ProductDetailsScreen} />
      <Route path='/solutions' Component={SolutionsScreen} />
      <Route path='/blogs' Component={BlogScreen} />
      <Route path='/testimonials' Component={TestimonialsScreen} />
      <Route path='/contactus' Component={ContactScreen} />
      <Route path='/checkout' Component={CheckoutScreen} />

      <Route path='/admin'>
        <Route Component={GuestMiddleware}>
          <Route path='login' Component={AdminLoginScreen} />
        </Route>

        <Route Component={AuthMiddleware}>
          <Route index Component={AdminWelcomeScreen} />
          <Route path='profile' Component={AdminProfileScreen} />
          <Route path='queries' Component={AdminCustomerQueriesListScreen} />
          <Route path='queries/:id' Component={AdminCustomerQueryDetailsScreen} />
          <Route path='users' Component={AdminUserListScreen} />
          <Route path='users/create' Component={AdminUserCreationScreen} />
          <Route path='users/:id' Component={AdminUserDetailsScreen} />
        </Route>

      </Route>

    </Routes>
  )
}

export default Router