import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParamsUser } from '../../features/user/slice';
import Bio from './Bio';
import Tracker from '../../components/Tracker';
import { getRandomColor, getRandomEmoji } from '../../utils/random';

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

  const notExist: Bio = {
    profileId: 'null',
    name: 'null',
    color: getRandomColor(),
    emoji: getRandomEmoji(),
  };

  return (
    <div>
      {paramsUser.bio ? (
        <>
          <Bio bio={paramsUser.bio} isSignedUser={paramsUser.isSignedUser} />
        </>
      ) : (
        <>
          <Bio bio={notExist} isSignedUser={false} />
          <div>This user doesn't exist.</div>
        </>
      )}
    </div>
  );
}

export default Profile;
