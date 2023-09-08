import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { guestBio } from '../../config/guestData';
import Pic from '../../components/Pic';
import Edit from './Edit';
import Menu from './Menu';
import Description, {
  Mokup,
  Relative,
  Tooltip,
} from '../../components/Description';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { flexCenter, media } from '../../styles/Mixin';

const Name = styled.div`
  padding: 15px 0 5px;
  font-family: ${fontAll.main};
  font-size: 1.2rem;
`;

const Id = styled.div`
  color: ${colorAll.light.grey};
  font-family: ${fontAll.main};
  font-size: 0.9rem;
`;

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: 30px 0;
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
    font-family: ${fontAll.logo};
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

function SettingDescription() {
  const [mode, setMode] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const { values, setValues, handleChange, setError } = useForm({
    initialValue,
  });

  return (
    <Description title={`SETTING`}>
      <Mokup>
        <Grid>
          <Left>
            <Relative>
              <Tooltip
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
                <Id>@{guestBio.profileId}</Id>
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
    </Description>
  );
}

export default SettingDescription;
