import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParamsUser } from '../../features/user/slice';
import Bio from './Bio';
import TrackerList from '../../components/Tracker/TrackerList';

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

  return (
    <div>
      <Bio bio={paramsUser.bio} isSignedUser={paramsUser.isSignedUser} />
      {isBio ? (
        <div>
          <TrackerList list={paramsUser.trackers} />
        </div>
      ) : (
        <div>This user doesn't exist.</div>
      )}
    </div>
  );
}

export default Profile;
