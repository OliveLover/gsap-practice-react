import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const ContainerImg = () => {
  const reactLogoRef = useRef(null);
  const viteLogoRef = useRef(null);
  const timelineRef = useRef(null);

  const [puaseState, setPauseState] = useState(false);

  useEffect(() => {
    // 초기 설정: vite는 숨김 + 중앙 회전 45도
    gsap.set(viteLogoRef.current, {
      autoAlpha: 0,
      rotateY: 90,
    });

    // 둘 다 화면 중앙 고정
    gsap.set([reactLogoRef.current, viteLogoRef.current], {
      position: 'absolute',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
    });

    // 애니메이션 타임라인 구성
    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .to(reactLogoRef.current, {
        rotateY: 90,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power3.in',
      })
      .to(viteLogoRef.current, {
        rotateY: 180,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
  }, []);

  const handlePlay = () => {
    timelineRef.current?.play();
  };

  const handleReverse = () => {
    timelineRef.current?.reverse();
  }

  const handlePause = () => {
    timelineRef.current?.pause();
    setPauseState(!puaseState);
  }

  const handleResume = () => {
    timelineRef.current?.resume();
    setPauseState(!puaseState);
  }

  const handleRestart = () => {
    timelineRef.current?.restart();
    setPauseState(false);
  }

  return (
    <div className="container" style={{ position: 'relative', width: '100%', height: '300px', margin: '0 30px' }}>
      <img
        id="reactLogo"
        ref={reactLogoRef}
        src={reactLogo}
        style={{ width: '120px', height: '120px' }}
      />
      <img
        id="viteLogo"
        ref={viteLogoRef}
        src={viteLogo}
        style={{ width: '120px', height: '120px' }}
      />
      <div className="animation-controller" style={{ textAlign: 'center', marginTop: '200px' }}>
        <button onClick={handlePlay}>play</button>
        {puaseState ?
          <button onClick={handleResume}>resume</button>
          : <button onClick={handlePause}>pause</button>
        }
        <button onClick={handleReverse}>reverse</button>
        <button onClick={handleRestart}>restart</button>
      </div>
    </div>
  );
};

export default ContainerImg;
