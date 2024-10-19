import React, { useState } from 'react';

const Dice = () => {
  const [input, setInput] = useState('3d6');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const rollDice = (input) => {
    const regex = /^(\d+)d(\d+)$/;
    const match = input.match(regex);

    if (!match) {
      throw new Error("Invalid input format. Use NdM format (e.g., 3d6).");
    }

    const numDice = parseInt(match[1], 10);
    const numSides = parseInt(match[2], 10);

    if (numDice < 1 || numDice > 100 || numSides < 2 || numSides > 100) {
      throw new Error("Number of dice must be between 1 and 100, and number of sides must be between 2 and 100.");
    }

    let total = 0;
    const results = [];

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      results.push(roll);
      total += roll;
    }

    console.log(`Roll results: ${results.join(', ')}`);
    console.log(`Total: ${total}`);
    return total;
  };

  const handleRoll = () => {
    try {
      const total = rollDice(input);
      setResult(total);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Dice Roller</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter NdM (e.g., 3d6)"
      />
      <button onClick={handleRoll}>Roll Dice</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && <p>Total: {result}</p>}
    </div>
  );
};

export default Dice;
