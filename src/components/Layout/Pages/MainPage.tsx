import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './HomePage'
import Favorites from './FavoritesPage'
import GiftCard from './GiftCartPage'
import UserLogin from '../UserInteraction/UserLogin'
import UserRegistration from '../UserInteraction/UserRegistration'

const MainPage = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/favorites" element={<Favorites />}></Route>
			<Route path="/gift" element={<GiftCard />}></Route>
			<Route path="/login" element={<UserLogin />}></Route>
			<Route path="/register" element={<UserRegistration />}></Route>
		</Routes>
	)
}

export default MainPage
