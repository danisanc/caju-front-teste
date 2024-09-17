import { render, screen } from '@testing-library/react';

import { Header } from '.';

describe('Header', () => {
  it('Should show header correcly', () => {
    render(
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>,
    );

    expect(screen.getByText('Caju Front Teste')).toBeInTheDocument();
  });
});
