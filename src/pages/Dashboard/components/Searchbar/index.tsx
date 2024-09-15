import { HiRefresh } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';

import * as S from './styles';

export const SearchBar = () => {
  const navigate = useNavigate();

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  const refetchData = () => {
    navigate('.', { replace: true });
  };

  return (
    <S.Container>
      <TextField mask="999.999.999-99" placeholder="Digite um CPF válido" />

      <S.Actions>
        <IconButton aria-label="refetch" onClick={refetchData}>
          <HiRefresh />
        </IconButton>

        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
