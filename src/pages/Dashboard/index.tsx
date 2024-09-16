import { Suspense } from 'react';
import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom';

import Loading from '~/components/Loading';
import { Collumns } from '~/pages/Dashboard/components/Columns';
import { SearchBar } from '~/pages/Dashboard/components/Searchbar';
import * as Api from '~/services/api';
import { Registration } from '~/types';

import * as S from './styles';

export const dashboardLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const documentTerm = url.searchParams.get('cpf');

  const registrationsPromise = Api.get<Registration[]>(
    documentTerm ? `registrations?cpf=${documentTerm}` : 'registrations',
  );

  return defer({ registrationsPromise });
};

const DashboardPage = () => {
  const { registrationsPromise } = useLoaderData() as {
    registrationsPromise: Promise<Registration[]>;
  };

  return (
    <S.Container>
      <SearchBar />

      <Suspense fallback={<Loading />}>
        <Await resolve={registrationsPromise}>
          {(registrations) => <Collumns registrations={registrations} />}
        </Await>
      </Suspense>
    </S.Container>
  );
};
export default DashboardPage;
