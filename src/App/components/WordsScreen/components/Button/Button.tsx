import * as React from 'react';

import './Button.modules.scss';

interface IProps {
  children?: React.ReactNode;
  onClick?: (e) => void;
  backgroundColor?: string;
}

const Button = ({ children, onClick, backgroundColor }: IProps) => {
  return (
    <div styleName="button" onClick={onClick} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

Button.defaultProps = {
  children: null,
  onClick: () => null,
  backgroundColor: null,
};

export default Button;
