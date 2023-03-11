import React from 'react'
import { Link } from 'react-router-dom'

import style from '../../styles/Navigation/Navigation.module.scss'

const Navigation = () => {
	return (
		<div className={style.navigation}>
			<ul className={style.navigation_ul}>
				<li className={style.navigation_ul_li}>
					<Link to="/">Home</Link>
				</li>
				<li className={style.navigation_ul_li}>
					<Link to="/favorites">Favorites</Link>
				</li>
				<li className={style.navigation_ul_li}>
					<Link to="/gift">Gift Cards</Link>
				</li>
				<li className={style.navigation_ul_li}>
					<Link to="/login">Login</Link>
				</li>
				<li className={style.navigation_ul_li}>
					<Link to="/register">Register</Link>
				</li>
			</ul>
		</div>
	)
}

export default Navigation
