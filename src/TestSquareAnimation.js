import React from 'react'

const TestSquareAnimation = (props) => {
  const entries = props.history.map((guess, index) => {
    const asked = `${guess.testSquare.file}${guess.testSquare.rank}`
    if (guess.correct) {
      return <li key={index}>{index + 1}: Correct - asked: {asked}</li>
    } else {
      const guessed = `${guess.guess.file}${guess.guess.rank}`
      return <li key={index}>{index + 1}: Incorrect - asked: {asked}, guessed: {guessed}</li>
    }
  })
  return (
    <ul>
      {entries}
    </ul>
  )
}

export default TestSquareAnimation;