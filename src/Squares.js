import React from 'react'

 export const Squares = (props) => {
   return props.squares.map(square => {
    return <div
      onClick={props.handleClick}
      key={square.file + square.rank}
      id={square.file + square.rank}
      rank={square.rank}
      file={square.file}
      className={'square ' + square.type}>
    </div>
  })
 }
