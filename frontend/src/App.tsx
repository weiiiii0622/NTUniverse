import './App.css'
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';
import { animated, useSpring, config } from "@react-spring/web";
import { useTrail } from '@react-spring/three';



function App() {

	return (
		<>
			<AppHtmlElements />
			<AppCanvas />
		</>
	)
}

export default App