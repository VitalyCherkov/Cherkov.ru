import * as React from 'react';
import { animated, config, useSpring } from 'react-spring';

import Button from './components/Button';
import Line from './components/Line';
import './WordsScreen.modules.scss';

interface IProps {
  scrolledParent: React.RefObject<HTMLElement>;
}

const getRandomColor = () => {
  const getParam = () => Math.floor(Math.random() * 256);
  return `rgb(${getParam()}, ${getParam()}, ${getParam()})`;
};

const AnimatedButton = animated(Button);

export default ({ scrolledParent }: IProps) => {
  const containerRef = React.useRef<HTMLElement>(null);
  const [scrollTop, setScrollTop] = React.useState<number>(0);

  React.useEffect(() => {
    if (!scrolledParent.current) {
      return;
    }

    const handleScroll = () =>
      requestAnimationFrame(() => {
        if (!scrolledParent.current || !containerRef.current) {
          return;
        }

        const fullHeight =
          window.innerHeight +
          containerRef.current.getBoundingClientRect().height;

        const scrolledHeight = Math.max(
          scrolledParent.current.scrollTop +
            window.innerHeight -
            containerRef.current.offsetTop,
          0
        );

        const scrolledOffset = Math.floor(
          Math.min((scrolledHeight / fullHeight) * 100, 100)
        );

        setScrollTop(scrolledOffset);
      });

    scrolledParent.current.addEventListener('scroll', handleScroll);

    return () => {
      if (!scrolledParent.current) {
        return;
      }

      scrolledParent.current.removeEventListener('scroll', handleScroll);
    };
  }, [scrolledParent.current]);

  const [color, setColor] = React.useState(getRandomColor());
  const [buttonColor, setButtonColor] = React.useState(getRandomColor);

  const handleGenerateColor = () => {
    setColor(buttonColor);
    setButtonColor(getRandomColor());
  };

  const sectionProps = useSpring({
    to: {
      backgroundColor: color,
    },
    config: config.gentle,
  });

  const buttonProps = useSpring({
    to: {
      backgroundColor: buttonColor,
    },
    config: config.gentle,
  });

  return (
    <animated.section
      style={sectionProps}
      styleName="words-screen"
      ref={containerRef}
    >
      <Line phrase="Виталий Черков" offset={scrollTop} speed={2} />
      <Line phrase="Фронтенд" offset={scrollTop} speed={-1} />
      <Line phrase="Vitaly Cherkov" offset={scrollTop} speed={-2} />
      <Line phrase="Frontend" offset={scrollTop} speed={3} />
      <AnimatedButton {...buttonProps} onClick={handleGenerateColor}>
        Шмяк!
      </AnimatedButton>
    </animated.section>
  );
};
