import React from 'react'
import style from '../../styles/Input.module.css'

type Input = {
	type: string
	value: string
	placeholder: string
	onChange: () => {}
	className: string
}

const Input = ({ type, value, placeholder, onChange, className }: Input) => {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={style.className}></input>
	)
}

export default Input
