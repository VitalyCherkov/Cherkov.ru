import * as React from 'react';
import { animated, config, useSpring } from 'react-spring';

import './Line.modules.scss';

interface IProps {
  phrase: string;
  offset?: number;
  speed?: number;
  className?: string;
}

const LINE_LEN = 200;

const Line = (props: IProps) => {
  const { phrase, className, offset, speed } = props;
  const repeatCount = LINE_LEN / (phrase.length + 1) + 1;
  const res = `${phrase} `.repeat(repeatCount);

  const animatedProps = useSpring({
    to: { left: `${offset! * speed!}%` },
    config: {
      mass: 26,
      tension: 100,
      friction: 100,
    },
  });

  return (
    <div className={className} styleName="line__container">
      <animated.div
        style={animatedProps}
        styleName="line"
        className={className}
      >
        {res}
      </animated.div>
    </div>
  );
};

Line.defaultProps = {
  className: null,
  offset: 0,
  speed: 1,
};

export default Line;
