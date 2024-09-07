export type ActivityProps = {
	title: string
	content: string
	userName: string
	timestamp: string
}

export default function Index({
	title,
	content,
	userName,
	timestamp,
}: ActivityProps) {
	return (
		<div className="window">
			<div className="title-bar">
				<div className="title-bar-text">{title}</div>
			</div>
			<div className="window-body">{content}</div>
			<div className="status-bar">
				<p className="status-bar-field">{userName}</p>
				<p className="status-bar-field">{timestamp}</p>
			</div>
		</div>
	)
}
