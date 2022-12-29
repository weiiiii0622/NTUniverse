import './App.css'
import React, { RefObject, useContext, useRef } from 'react'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import AppHtmlElements from './Containers/HTML/HtmlElements';
import AppCanvas from './Containers/THREE/Canvas';
import { SetStateType } from './Utils/type';



const NewContext = React.createContext<{ newRef: RefObject<any>, setCount: SetStateType<number> }>({
	newRef: null!,
	setCount: (x) => { },
});

function App() {
	const [modalOpen, setModalOpen] = useState(true);

	const ref = useRef(null!);
	const [count, setCount] = useState(0);
	return (
		<>
			<AppHtmlElements />
			<AppCanvas />
		</>
	)
}

export default App
