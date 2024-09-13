import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useRevalidator } from "react-router-dom";

import { ButtonSmall } from "~/components/Buttons";
import * as Api from "~/services/api";

import * as S from "./styles";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const { revalidate } = useRevalidator();

  const handleChangeStatus = (status: string) => {
    Api.put(`registrations/${props.data.id}`, {
      ...props.data,
      status: status,
    }).finally(() => {
      revalidate();
    });
  };

  const handleDelete = () => {
    Api.del(`registrations/${props.data.id}`).finally(() => {
      revalidate();
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
        {props.data.status === "REVIEW" ? (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => handleChangeStatus("APPROVED")}
          >
            Aprovar
          </ButtonSmall>
        ) : undefined}

        {props.data.status === "REVIEW" ? (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => handleChangeStatus("REPROVED")}
          >
            Reprovar
          </ButtonSmall>
        ) : undefined}

        {props.data.status === "APPROVED" ||
        props.data.status === "REPROVED" ? (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => handleChangeStatus("REVIEW")}
          >
            Revisar novamente
          </ButtonSmall>
        ) : undefined}

        <HiOutlineTrash
          onClick={() => {
            handleDelete();
          }}
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
