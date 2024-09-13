import { SearchBar } from "~/pages/Dashboard/components/Searchbar";
import Collumns from "~/pages/Dashboard/components/Columns";

import * as S from "./styles";

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </S.Container>
  );
};
export default DashboardPage;
