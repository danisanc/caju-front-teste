import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import routes from '~/router/routes';

import NewUserPage from '.';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: () => mockedUseNavigate,
}));

const RenderComponent = () => {
  const router = createMemoryRouter(
    [
      {
        path: routes.newUser,
        element: <NewUserPage />,
      },
    ],
    {
      initialEntries: ['/', routes.newUser],
      initialIndex: 1,
    },
  );

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

describe('NewUsersPage', () => {
  it('Should render all fields', async () => {
    render(<RenderComponent />);

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    });
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument();
  });

  it('Should render errors', async () => {
    render(<RenderComponent />);

    const button = await screen.findByRole('button', {
      name: /Cadastrar/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toEqual(4);
    });
  });

  it('Should register new candidate', async () => {
    render(<RenderComponent />);

    const name = screen.getByLabelText('Nome');
    const email = screen.getByLabelText('Email');
    const cpf = screen.getByLabelText('CPF');
    const date = screen.getByLabelText('Data de admissão');

    await userEvent.type(name, 'Daniel dos Santos');
    await userEvent.type(email, 'im.dancardoso@gmail.com');
    await userEvent.type(cpf, '78502270001');
    fireEvent.change(date, { target: { value: '2024-10-15' } }); // Será? 🙏🏻

    const registerButton = screen.getByRole('button', {
      name: /Cadastrar/i,
    });

    userEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith(routes.dashboard);
    });
  });
});
