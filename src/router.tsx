import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import ProductsScreen from './screens/ProductsScreen'
import SolutionsScreen from './screens/SolutionsScreen'
import BlogScreen from './screens/BlogScreen'
import TestimonialsScreen from './screens/TestimonialsScreen'
import ContactScreen from './screens/ContactScreen'

const Router: React.FC = () => {
  return (
    <Routes>
        <Route path='/' Component={HomeScreen} />
        <Route path='/aboutus' Component={AboutScreen} />
        <Route path='/products' Component={ProductsScreen} />
        <Route path='/solutions' Component={SolutionsScreen} />
        <Route path='/blogs' Component={BlogScreen} />
        <Route path='/testimonials' Component={TestimonialsScreen} />
        <Route path='/contactus' Component={ContactScreen} />
    </Routes>
  )
}

export default Router