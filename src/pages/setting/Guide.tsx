import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { guestBio } from '../../config/guestData';
import Pic from '../../components/Pic';
import Edit from './Edit';
import Menu from './Menu';
import Guide, { Mokup, Relative, Tooltip } from '../../components/Guide';
import styled from 'styled-components';
import { Name, ProfileId } from '../../styles/Tracker';
import { colorAll } from '../../styles/Variables';
import { flexCenter, media } from '../../styles/Mixin';

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: 30px 0;

  ${Name} {
    padding: 15px 0 5px;
  }
`;

const Right = styled.section`
  grid-area: right;
  padding: 20px;

  ${media.mobile} {
    padding: 10px;
  }
`;

const Left = styled.section`
  width: 100%;
  grid-area: left;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colorAll.line};
  h1 {
    padding: 20px 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  width: 100%;
`;

const initialValue: EditProfileFormValue = {
  name: '',
  color: '',
  emoji: '',
};

function SettingGuide() {
  const [mode, setMode] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const { values, setValues, handleChange, setError } = useForm({
    initialValue,
  });

  return (
    <Guide title={`SETTING`}>
      <Mokup>
        <Grid>
          <Left>
            <Relative>
              <Tooltip
                isLeft={true}
                position={'bottom: 1%; right: 10%;'}
                message={`프로필 세팅
                - 변경되는 내용 바로 표현
                - 이름, 이모지, 컬러 변경 가능`}
              />
              <Container>
                <Pic
                  emoji={values.emoji || guestBio.emoji}
                  color={values.color || guestBio.color}
                  size={180}
                />
                <Name>{values.name || guestBio.name}</Name>
                <ProfileId>@{guestBio.profileId}</ProfileId>
              </Container>
            </Relative>
            <Menu handleMenu={setMode} mode={mode} />
          </Left>
          <Right>
            <Edit
              mode={mode}
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              setError={setError}
              setDisabled={setDisabled}
            />
          </Right>
        </Grid>
      </Mokup>
    </Guide>
  );
}

export default SettingGuide;
