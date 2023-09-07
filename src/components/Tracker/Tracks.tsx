import React from 'react';
import Track from './Track';
import { make2week } from '../../utils';
import { TRACKS } from '../../styles/Track';

interface TracksProps {
  startDate: string;
  color: string;
  schedules: Schedule[];
}

function Tracks({ startDate, color, schedules }: TracksProps) {
  const weekFromCratedDay = make2week(startDate);
  const makeTracks = weekFromCratedDay.map((day, i) => {
    return (
      <Track key={i} day={day} order={i} schedules={schedules} color={color} />
    );
  });

  return <TRACKS>{makeTracks}</TRACKS>;
}

export default Tracks;
