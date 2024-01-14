import React from 'react';

function Square({ chooseSquare, val }) {
  return (
    <div className='Square' onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square