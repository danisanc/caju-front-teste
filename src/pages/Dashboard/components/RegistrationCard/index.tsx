import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
} from 'react-icons/hi';
import { useRevalidator } from 'react-router-dom';
import { toast } from 'sonner';

import { ButtonSmall } from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import { Dialog } from '~/components/Dialog';
import * as Api from '~/services/api';

import * as S from './styles';

type Props = {
  data: any;
};

const ConfirmModalDescriptions: { [key in string]: string } = {
  APPROVED: 'Deseja aprovar o candidato?',
  REPROVED: 'Deseja reprovar o candidato?',
  REVIEW: 'Deseja revisar novamente o candidato?',
  DELETE: 'Deseja remover o candidato?',
};

const ConfirmModalToast: { [key in string]: string } = {
  APPROVED: 'aprovado(a)',
  REPROVED: 'reprovado(a)',
  REVIEW: 'pronto(a) para ser revisado(a)',
  DELETE: 'removido(a)',
};

const RegistrationCard = (props: Props) => {
  const { revalidate } = useRevalidator();

  const isReview = props.data.status === 'REVIEW';
  const isReviwed =
    props.data.status === 'APPROVED' || props.data.status === 'REPROVED';

  const handleChangeStatus = (status: string) => {
    Api.put(`registrations/${props.data.id}`, {
      ...props.data,
      status: status,
    })
      .then(() => {
        toast.success(
          `${props.data.employeeName} ${ConfirmModalToast[status]}`,
        );
        revalidate();
      })
      .catch(() => {
        toast.error(`Erro ao tentar atualizar candidato(a)`);
      });
  };

  const handleDelete = () => {
    Api.del(`registrations/${props.data.id}`)
      .then(() => {
        toast.success(
          `${props.data.employeeName} ${ConfirmModalToast['DELETE']}`,
        );
        revalidate();
      })
      .catch(() => {
        toast.error(`Erro ao tentar remover candidato(a)`);
      });
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>

      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>

      <S.Actions>
        {isReview ? (
          <Dialog
            description={ConfirmModalDescriptions['APPROVED']}
            onConfirm={() => handleChangeStatus('APPROVED')}
          >
            <ButtonSmall as="span" bgcolor="rgb(155, 229, 155)">
              Aprovar
            </ButtonSmall>
          </Dialog>
        ) : undefined}

        {isReview ? (
          <Dialog
            description={ConfirmModalDescriptions['REPROVED']}
            onConfirm={() => handleChangeStatus('REPROVED')}
          >
            <ButtonSmall as="span" bgcolor="rgb(255, 145, 154)">
              Reprovar
            </ButtonSmall>
          </Dialog>
        ) : undefined}

        {isReviwed ? (
          <Dialog
            description={ConfirmModalDescriptions['REVIEW']}
            onConfirm={() => handleChangeStatus('REVIEW')}
          >
            <ButtonSmall as="span" bgcolor="#ff8858">
              Revisar novamente
            </ButtonSmall>
          </Dialog>
        ) : undefined}

        <Dialog
          description={ConfirmModalDescriptions['DELETE']}
          onConfirm={() => handleDelete()}
        >
          <IconButton as="span" aria-label="Remover">
            <HiOutlineTrash />
          </IconButton>
        </Dialog>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
