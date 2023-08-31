import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchParamsUser,
  setSchedules,
  setTrackers,
} from '../../features/user/slice';
import { cheerApi, toggleDoneApi } from '../../features/user/api';
import TrackerList from '../../components/Tracker/TrackerList';
import Bio from './Bio';
import Today from './Today';

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { profileId } = useParams();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const paramsUser = useSelector((state: State) => state.profile);

  useEffect(() => {
    if (profileId) {
      const paramsUserValue: ParamsUserValue = { profileId, signedId };
      dispatch(fetchParamsUser(paramsUserValue));
    }
  }, [signedId, profileId]);

  const isBio: boolean = paramsUser.bio === null ? false : true;

  const handleDone = async (scheduleId: string) => {
    const { status, data } = await toggleDoneApi(scheduleId);
    if (status === 200) {
      dispatch(setSchedules(data.schedules));
      dispatch(setTrackers(data.trackers));
    }
  };

  const handleCheer = async (scheduleId: string) => {
    if (signedId) {
      const { status, data } = await cheerApi(scheduleId, signedId);
      if (status === 200) {
        dispatch(setSchedules(data.schedules));
      }
    }
  };

  return (
    <div>
      <Bio bio={paramsUser.bio} isSignedUser={paramsUser.isSignedUser} />
      {isBio ? (
        <div>
          <Today
            schedules={paramsUser.todaySchedules}
            isSignedUser={paramsUser.isSignedUser}
            handleDone={handleDone}
            handleCheer={handleCheer}
          />
          <TrackerList list={paramsUser.trackers} />
        </div>
      ) : (
        <div>This user doesn't exist.</div>
      )}
    </div>
  );
}

export default Profile;
