import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserByProfileIdApi } from '../../features/user/api';
import Bio from './Bio';
import styled from 'styled-components';

const PROFILE = styled.div`
  display: flex;
  flex-direction: column;
`;

function Profile() {
  const { profileId } = useParams();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [paramsBio, setParamsBio] = useState<User | null>();
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

  return (
    <PROFILE>
      {paramsBio ? (
        <>
          <Bio paramsBio={paramsBio} isSignedUser={isSignedUser} />
        </>
      ) : (
        <div>존재하지 않는 사용자입니다</div>
      )}
    </PROFILE>
  );
}

export default Profile;
