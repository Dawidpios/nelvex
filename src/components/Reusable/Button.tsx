
type ButtonType = {
	className: string
	onClick: () => void
	text: string
}

const Button = ({ className, onClick, text }: ButtonType) => {
	return (
		<button className={className} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
