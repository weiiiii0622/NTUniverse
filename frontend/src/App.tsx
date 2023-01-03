import './App.css'
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';
import { animated, useSpring, config } from "@react-spring/web";
import { useTrail } from '@react-spring/three';

function Test() {

	const { opacity } = useSpring({
		from: {
			opacity: 0,
		},
		to: [
			{
				opacity: 0.8,
			},
			{
				opacity: 0,
			},
		],
		config: {
			tension: 280,
			friction: 60,
			duration: 2000,
		},
		delay: 200,
	});

	const springText = useSpring({
		from: {
			left: '100%',
			opacity: 0,
		},
		to: [
			{
				left: '45%',
				opacity: 1,
			},
			{
				left: '-15%',
				opacity: 0,
			}
		],
		config: {
			tension: 280,
			friction: 80,
		},
		delay: 400,
	});

	const springTop = useSpring({
		from: {
			width: 600,
			left: '100%',
			opacity: 0,
		},
		to: [
			{
				width: 250,
				left: '42.5%',
				opacity: 1,
			},
			{
				width: 600,
				left: '-15%',
				opacity: 0,
			}
		],
		config: {
			tension: 280,
			friction: 80,
		},
		delay: 170,
	});


	const springBot = useSpring({
		from: {
			width: 600,
			right: '100%',
			opacity: 0,
		},
		to: [
			{
				width: 250,
				right: '42.5%',
				opacity: 1,
			},
			{
				width: 600,
				right: '-15%',
				opacity: 0,
			}
		],
		config: {
			tension: 280,
			friction: 80,
		},
		delay: 150,
	});

	return <>
		<animated.div style={{
			pointerEvents: 'none',
			position: 'absolute',
			zIndex: 200,
			fontFamily: 'burnfont-italic',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			fontSize: '40px',
			backdropFilter: 'blur(5px)',
		}}>
			<animated.div style={{
				width: '100%',
				height: "100%",
				backgroundColor: '#000000',
				opacity,
				position: 'relative',
			}}
			>
			</animated.div>
			<animated.div style={{
				color: '#f3eddd',
				position: 'absolute',
				borderTop: '4px #f3eddd solid',
				top: '25%',
				...springTop
			}} />
			<animated.div
				style={{
					color: '#f3eddd',
					position: 'absolute',
					top: '30%',
					...springText,
				}}
			>
				小福廣場
			</animated.div>
			<animated.div style={{
				color: '#f3eddd',
				position: 'absolute',
				borderTop: '4px #f3eddd solid',
				top: '40%',
				...springBot,
			}} />
		</animated.div>
	</>
}

function App() {

	return (
		<>
			{/* <Test /> */}
			<AppHtmlElements />
			<AppCanvas />
		</>
	)
}

export default App

export { Test };