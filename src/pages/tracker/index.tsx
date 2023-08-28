import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { AiOutlineLink } from 'react-icons/ai';
import { getTrackerById } from '../../features/tracker/api';
import { toggleDoneApi } from '../../features/user/api';
import Pic from '../../components/Pic';
import Track from '../../components/Tracker/Track';
import Schedules from '../../components/Schedules';
import { make2week } from '../../utils';
import { TRACKS } from '../../styles/Track';

function Tracker() {
  const { trackerId } = useParams();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [tracker, setTracker] = useState<Tracker>();
  const [isSignedUser, setIsSignedUser] = useState<boolean>(false);

  useEffect(() => {
    if (trackerId) {
      const getTrackerInfo = async () => {
        const { status, data } = await getTrackerById(trackerId);
        if (status === 200) {
          setTracker(data.tracker);
          setIsSignedUser(data.tracker.user._id === signedId);
        }
      };
      getTrackerInfo();
    }
  }, [trackerId, signedId]);

  const handleDone = async (scheduleId: string) => {
    const { status, data } = await toggleDoneApi(scheduleId);
    if (status === 200) {
      setTracker(data.tracker);
    }
  };

  const weekFromCratedDay = make2week(tracker?.created_at);
  const makeTracks = weekFromCratedDay.map((day, i) => {
    return (
      <Track
        key={i}
        day={day}
        order={i}
        schedules={tracker?.schedules || []}
        color={tracker?.user.color}
      />
    );
  });

  return (
    <div>
      <h2>Tracker</h2>
      {tracker ? (
        <>
          <div>
            <div>
              <Pic
                emoji={tracker.user.emoji}
                color={tracker.user.color}
                size={50}
              />
              <div>
                <div>{tracker.user.name}</div>
                <div>@{tracker.user.profileId}</div>
              </div>
              <div>
                <IoIosMore />
              </div>
            </div>
          </div>
          <div>
            <div>{tracker.text}</div>
            <TRACKS>{makeTracks}</TRACKS>
            {tracker.url && (
              <div>
                <AiOutlineLink />
                <a
                  href={
                    tracker.url.slice(0, 4) === 'http'
                      ? tracker.url
                      : `https://${tracker.url}`
                  }
                >
                  {tracker.url}
                </a>
              </div>
            )}
            <div>
              {tracker.tags.map((tag: string, i: number) => (
                <div key={i}>#{tag}</div>
              ))}
            </div>
            <div>
              <Schedules
                schedules={tracker.schedules}
                isSignedUser={isSignedUser}
                handleDone={handleDone}
              />
            </div>
          </div>
        </>
      ) : (
        <div>존재하지 않는 Tracker입니다.</div>
      )}
    </div>
  );
}

export default Tracker;
