import React from 'react'
import { Routes, Route } from 'react-router-dom'
import style from '../../../styles/Pages/MainPage.module.scss'

import Home from './HomePage'
import Favorites from './FavoritesPage'
import GiftCard from './GiftCartPage'
import UserLogin from '../UserInteraction/UserLogin'
import Registration from '../../Account/Registration'

const MainPage = () => {
	return (
		<div className={style.mainPage}>
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/favorites" element={<Favorites />}></Route>
			<Route path="/gift" element={<GiftCard />}></Route>
			<Route path="/login" element={<UserLogin />}></Route>
			<Route path="/register" element={<Registration />}></Route>
		</Routes>
		</div>
	)
}

export default MainPage
