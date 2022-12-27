import './App.css'
import React from 'react'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';

function App() {
	const [modalOpen, setModalOpen] = useState(true);
	return (
		<>
			<AppHtmlElements />
			<AppCanvas />
		</>
	)
}

export default App
