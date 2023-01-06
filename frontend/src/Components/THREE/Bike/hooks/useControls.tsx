import { useEffect, useRef } from 'react'
import { useMyContext } from '../../../../Utils/useMyContext'

export function useKeyPress(target: string[], event: (x: any) => void) {
    useEffect(() => {
        const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
        const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])
}

interface IControls {
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean,
    brake: boolean,
    reset: boolean,
};

export function useControls() {

    const keys = useRef({ forward: false, backward: false, left: false, right: false, brake: false, reset: false, navigate: false })
    useKeyPress(['ArrowUp', 'w', 'W'], (pressed) => (keys.current.forward = pressed))
    useKeyPress(['ArrowDown', 's', 'S'], (pressed) => (keys.current.backward = pressed))
    useKeyPress(['ArrowLeft', 'a', 'A'], (pressed) => (keys.current.left = pressed))
    useKeyPress(['ArrowRight', 'd', 'D'], (pressed) => (keys.current.right = pressed))
    useKeyPress([' '], (pressed) => (keys.current.brake = pressed))
    useKeyPress(['r', 'R'], (pressed) => (keys.current.reset = pressed))
    useKeyPress(['Enter'], (pressed) => (keys.current.navigate = pressed))
    return keys
}

export type { IControls };