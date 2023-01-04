import './App.css'
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';
import { BikeProvider } from './Containers/hooks/useBikeContext';
import { LocationProvider } from './Containers/hooks/useLocation';
import { ConfigProvider, Divider, Layout } from 'antd';
import styled from 'styled-components';

const AppWrapper = styled.div`
	height: 100vh;
	margin: 0;
  	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

function App() {

	return (
		<>
			<Layout style={{ height: '100vh' }}>
				<AppHtmlElements />
				<AppCanvas />
			</Layout>
		</>
	)
}

export default App