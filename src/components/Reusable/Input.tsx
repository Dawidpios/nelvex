import React from 'react'

type inputType = {
	type: string
	placeholder: string
	className: string
	onChange: () => void
}

const Input = React.forwardRef<HTMLInputElement, inputType>(({type, placeholder, className, onChange}, ref) => {

	return (
		<input
			ref={ref}
			type={type}
			placeholder={placeholder}
			className={className}
			onChange={onChange}
			></input>
	)
});

export default Input
