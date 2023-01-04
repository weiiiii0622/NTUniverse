import './App.css'
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';
import { animated, useSpring, config } from "@react-spring/web";
import { useTrail } from '@react-spring/three';
import { BikeProvider } from './Containers/hooks/useBikeContext';
import { LocationProvider } from './Containers/hooks/useLocation';



function App() {

	return (
		<>
			<LocationProvider>
				<BikeProvider>
					<AppHtmlElements />
					<AppCanvas />
				</BikeProvider>
			</LocationProvider>
		</>
	)
}

export default App