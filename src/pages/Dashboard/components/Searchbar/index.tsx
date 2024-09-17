import { useEffect, useState } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';

import * as S from './styles';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cpf, setCpf] = useState(searchParams.get('cpf') ?? '');

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  const refetchData = () => {
    navigate('.', { replace: true });
  };

  useEffect(() => {
    const formattedCpf = cpf.replace(/[^0-9]/g, '');

    if (formattedCpf.length === 11) {
      setSearchParams({
        cpf: formattedCpf,
      });
    }

    if (formattedCpf.length === 0) {
      setSearchParams({});
    }
  }, [cpf]);

  return (
    <S.Container>
      <TextField
        name="cpf"
        mask="999.999.999-99"
        placeholder="Digite um CPF válido"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />

      <S.Actions>
        <IconButton aria-label="Atualizar" onClick={refetchData}>
          <HiRefresh />
        </IconButton>

        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
