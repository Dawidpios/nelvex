import React from 'react'
import style from '../../styles/Button.module.css'

type Button = {
	className: string
	onClick: () => {}
	text: string
}

const Button = ({ className, onClick, text }: Button) => {
	return (
		<button className={style.className} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
