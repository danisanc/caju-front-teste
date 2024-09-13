import RegistrationCard from '~/pages/Dashboard/components/RegistrationCard';
import { Registration } from '~/types';

import * as S from './styles';

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
];

type CollumnsProps = {
  registrations: Registration[];
};

export const Collumns = ({ registrations }: CollumnsProps) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <S.TitleColumn status={collum.status}>{collum.title}</S.TitleColumn>

            <S.CollumContent>
              {registrations?.map((registration) => {
                if (collum.status === registration.status) {
                  return (
                    <RegistrationCard
                      key={registration.id}
                      data={registration}
                    />
                  );
                }

                return undefined;
              })}
            </S.CollumContent>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
