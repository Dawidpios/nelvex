import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import './App.css'
import Navigation from './components/Navigation/Navigation'
import NavigationMobile from './components/Navigation/NavigationMobile'
import MainPage from './components/Layout/Pages/MainPage'
import Footer from './components/Layout/Footer/Footer'

function App() {
	const isMobileOrDesktop = useMediaQuery({
		query: '(max-width: 671px)',
	})
	return (
		<BrowserRouter>
			<div className="App">
				{isMobileOrDesktop ? (
					<NavigationMobile></NavigationMobile>
				) : (
					<Navigation></Navigation>
				)}
				<MainPage></MainPage>
				<Footer></Footer>
			</div>
		</BrowserRouter>
	)
}

export default App
