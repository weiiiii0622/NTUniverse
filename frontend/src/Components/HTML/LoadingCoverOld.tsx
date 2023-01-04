import { useState, useEffect } from 'react';
import { animated } from '@react-spring/web'
import {
	Card,
	Row,
	Progress
} from 'antd';

import { useMyContext } from '../../Utils/useMyContext';




const LoadingCover = () => {

	const {
		isChangingScene,
		setIsChangeScene,
		isLoading,
		loadFinished,
		setLoadFinished
	} = useMyContext();
	const [showButton, setShowButton] = useState<boolean>(false);
	const [percent, setPercent] = useState<number>(0);

	const increase = (val) => {
		setPercent((prevPercent) => {
			const newPercent = prevPercent + val;;
			if (newPercent > 100) {
				return 100;
			}
			return newPercent;
		});
	};

	const decline = () => {
		setPercent((prevPercent) => {
			const newPercent = prevPercent - 10;
			if (newPercent < 0) {
				return 0;
			}
			return newPercent;
		});
	};

	useEffect(() => {
		//console.log(`isLoading: ${isLoading}`);
		if (isLoading === true) {
			setTimeout(() => {
				for (var i = 1; i <= 10; i++) {
					if (i != 10) {
						setTimeout(() => {
							increase(10);
						}, 200 * i);
					}
					else {
						setTimeout(() => {
							increase(9);
						}, 200 * i);
					}
					//increase(99);
				}
			}, 1000)
		}
		else {
			setTimeout(() => {
				increase(1);
			}, 3000 * 1);
		}
	}, [isLoading])

	useEffect(() => {
		if (percent === 100) {
			setShowButton(true);
		}
	}, [percent])

	return (
		<div
			style={{

				//display: 'flex',
				position: 'absolute',
				backgroundColor: '#CDCDCD',
				width: '100%',
				height: '100%',
				zIndex: '100',
				// justifyContent: 'center',
				// alignItems: 'center',
				//backgroundImage: `url(/pics/loading_cover.PNG)`
			}}
		>
			<Row
				justify={'center'}
				align={'middle'}
				style={{
					height: '80vh'
				}}
			>
				<>
					<Progress
						type="circle"
						percent={percent}
						style={{
							//marginRight: 8 
						}}
					/>
				</>
			</Row>

			<Row
				justify={'center'}
				align={'middle'}
				style={{
					height: '20vh'
				}}
			>
				{
					showButton
						?
						<Card
							hoverable={true}
							style={{
								height: '6vw',
								width: '20vw',
								display: 'flex',
								justifyContent: 'center',
								//backgroundColor: 'transparent',
								borderWidth: 5
							}}
							bodyStyle={{
								padding: 0,
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={() => {
								setIsChangeScene({ scene: '小福廣場' });
								setTimeout(() => {
									setLoadFinished(true);
								}, 2000);
							}}
						>
							進入
						</Card>
						:
						null
				}
			</Row>

			{/* <Button 
                //type="dashed" 
                type="default" 
                style={{
                    width: '20vw',
                    height: '6vh',
                    backgroundColor: 'transparent',
                    color: 'white',
                }}
            >
                進入
            </Button> */}
		</div>)
}

export default LoadingCover;



