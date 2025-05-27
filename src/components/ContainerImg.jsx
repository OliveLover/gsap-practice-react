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
    // 초기 설정
    gsap.set(viteLogoRef.current, {
      autoAlpha: 0,
      filter: 'blur(10px)',
    });

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
      // react 로고를 점점 블러하면서 사라짐
      .to(reactLogoRef.current, {
        rotate: 1080,
        filter: 'blur(30px)',
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      // vite 로고는 블러된 채 등장 후 선명해짐
      .to(viteLogoRef.current, {
        rotate:1080,
        autoAlpha: 1,
        duration: 1,
      }, '<') // 동시에 시작
      .to(viteLogoRef.current, {
        rotate: 1080,
        filter: 'blur(0px)',
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.3'); // 조금 더 빨리 선명해지기 시작
  }, []);

  const handlePlay = () => {
    timelineRef.current?.play();
  };

  const handleReverse = () => {
    timelineRef.current?.reverse();
  };

  const handlePause = () => {
    timelineRef.current?.pause();
    setPauseState(!puaseState);
  };

  const handleResume = () => {
    timelineRef.current?.resume();
    setPauseState(!puaseState);
  };

  const handleRestart = () => {
    timelineRef.current?.restart();
    setPauseState(false);
  };

  return (
    <div className="container" style={{ position: 'relative', width: '100%', height: '300px', margin: '0 30px' }}>
      <img
        id="reactLogo"
        ref={reactLogoRef}
        src={reactLogo}
        style={{ width: '120px', height: '120px', filter: 'blur(0px)' }}
      />
      <img
        id="viteLogo"
        ref={viteLogoRef}
        src={viteLogo}
        style={{ width: '120px', height: '120px', filter: 'blur(8px)' }}
      />
      <div className="animation-controller" style={{ textAlign: 'center', marginTop: '200px' }}>
        <button onClick={handlePlay}>play</button>
        {puaseState ? (
          <button onClick={handleResume}>resume</button>
        ) : (
          <button onClick={handlePause}>pause</button>
        )}
        <button onClick={handleReverse}>reverse</button>
        <button onClick={handleRestart}>restart</button>
      </div>
    </div>
  );
};

export default ContainerImg;
