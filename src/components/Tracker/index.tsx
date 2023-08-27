import React from 'react';
import Pic from '../Pic';

interface TrackerProps {
  tracker: Tracker;
}

function Tracker({ tracker }: TrackerProps) {
  const { user, text } = tracker;

  return (
    <div>
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <div>{text}</div>
    </div>
  );
}

export default Tracker;
