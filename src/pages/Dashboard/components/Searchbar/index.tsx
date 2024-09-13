import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import routes from "~/router/routes";
import TextField from "~/components/TextField";

import * as S from "./styles";

export const SearchBar = () => {
  const navigate = useNavigate();

  const goToNewAdmissionPage = () => {
    navigate(routes.newUser);
  };

  const refetchData = () => {
    navigate(".", { replace: true });
  };

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />

      <S.Actions>
        <IconButton aria-label="refetch" onClick={refetchData}>
          <HiRefresh />
        </IconButton>

        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
