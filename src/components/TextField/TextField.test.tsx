import { render, screen, waitFor } from '@testing-library/react';

import TextField from '.';

describe('TextField', () => {
  it('Should show text field correcly', () => {
    render(
      <TextField
        name="name"
        placeholder="Nome"
        label="Nome"
        error={{ type: 'required', message: 'Erro no nome' }}
      />,
    );

    const field = screen.getByPlaceholderText('Nome') as HTMLInputElement;

    waitFor(() => {
      expect(screen.getByRole('label', { name: /Nome/i })).toBeInTheDocument();
    });
    expect(field).toBeInTheDocument();
    expect(screen.getByText('Erro no nome')).toBeInTheDocument();
  });
});
