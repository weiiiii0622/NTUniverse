import { useState } from 'react'
import './App.css'

interface IProps {
	name: string,
	func?: <T>(x: T) => T,
};

function App(props: IProps) {

	const [count, setCount] = useState<number>(0);

	return (
		<div className="App">
			<p>Hello world!</p>
		</div>
	)
}

export default App
