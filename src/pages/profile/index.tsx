import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserByProfileIdApi } from '../../features/user/api';
import Bio from './Bio';
import { getRandomColor, getRandomEmoji } from '../../utils/random';

function Profile() {
  const { profileId } = useParams();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [paramsBio, setParamsBio] = useState<Bio | null>();
  const [isSignedUser, setIsSignedUser] = useState<boolean>(false);

  useEffect(() => {
    if (profileId && signedId) {
      const getUser = async () => {
        const result = await getUserByProfileIdApi(profileId, signedId);
        if (result.status === 200) {
          setParamsBio(result.data.bio);
          setIsSignedUser(result.data.isSigned);
        } else {
          setParamsBio(null);
          setIsSignedUser(false);
        }
      };

      getUser();
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
      {paramsBio ? (
        <Bio bio={paramsBio} isSignedUser={isSignedUser} />
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
