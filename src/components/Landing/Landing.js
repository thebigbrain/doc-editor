import React from 'react';

const style = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '20px',
  userSelect: 'none'
};

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.match.url);
  }

  render() {
    return (
      <div className='landing' style={style}>
        LANDING ...
      </div>
    );
  }
}
