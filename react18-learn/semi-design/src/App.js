import { useRef, useEffect, useState } from 'react'
import './App.css';
import { Button, Input } from '@douyinfe/semi-ui';
import Lottie from 'lottie-web'
import * as dataJson from './json/gift/gift.json'

const App = () => {

  const AnimationRef = useRef(null);
  const [lottieIns, setLottieIns] = useState(null);
  const [isEnter, setIsEnter] = useState(false)
  const interAnimation = () => {
    setIsEnter(true)
    setLottieIns(Lottie.loadAnimation({
      container: AnimationRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'https://file.jtsp99.com/group1/M01/B9/2B/rB8AtGJEJv-AKxokAABZYP5pugg68.json'
      // path: 'https://file.jtsp99.com/group1/M01/B6/DA/rB8KgmJEJt2AB8ViAABEUU9u8zs67.json'
    }))
  }
  const outAnimation = () => {
    console.log('离开')
    setIsEnter(false)
    setLottieIns(Lottie.loadAnimation({
      container: AnimationRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'https://file.jtsp99.com/group1/M01/B6/DA/rB8KgmJEJt2AB8ViAABEUU9u8zs67.json'
    }))
  }
  const playAnimation = () => {
    console.log('播放动画')
    lottieIns.play()
  }
  const stopAnimation = (e) => {
    console.log('停止动画')
    lottieIns.pause()
  }

  useEffect(() => {
    interAnimation()
  }, [])


  return (
    <>
      <Button type="secondary" onClick={ () =>  outAnimation() }>离开</Button>
      <Input defaultValue='hi'></Input>
      <div ref={ AnimationRef } style={{ width: '50px',height: '50px', overflow: 'hidden',margin: '0 auto' }}></div>
    </>
  );
}

export default App;
