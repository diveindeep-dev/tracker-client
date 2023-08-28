import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchParamsUser,
  setSchedules,
  setTrackers,
} from '../../features/user/slice';
import { toggleDoneApi } from '../../features/user/api';
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

  const isBio: boolean = paramsUser.bio;

  const handleDone = async (scheduleId: string) => {
    const { status, data } = await toggleDoneApi(scheduleId);
    if (status === 200) {
      dispatch(setSchedules(data.schedules));
      dispatch(setTrackers(data.trackers));
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
