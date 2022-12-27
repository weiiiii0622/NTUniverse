export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.24} />
            <directionalLight
                color={'#ffffff'}
                position={[10, 10, 10]}
                intensity={2}
                castShadow
            />
        </>
    )
}