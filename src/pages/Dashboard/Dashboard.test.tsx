import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter, defer } from 'react-router-dom';
import { Toaster } from 'sonner';

import { REGISTRATIONS_MOCK } from '~/pages/Dashboard/components/__mocks__/registrations';
import routes from '~/router/routes';

import Dashboard from '.';

const registrationsPromiseMock = Promise.resolve(REGISTRATIONS_MOCK);
const mockedUseNavigate = jest.fn();
const mockedSetSearchParam = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useNavigate: () => mockedUseNavigate,
  useSearchParams: () => {
    return [new URLSearchParams(), mockedSetSearchParam];
  },
}));

const RenderComponent = () => {
  const router = createMemoryRouter(
    [
      {
        path: routes.dashboard,
        element: <Dashboard />,
        loader: () => defer({ registrationsPromise: registrationsPromiseMock }),
      },
    ],
    {
      initialEntries: ['/', routes.dashboard],
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

describe('Dashboard', () => {
  it('Should render all columns', async () => {
    render(<RenderComponent />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Pronto para revisar' }),
      ).toBeTruthy();
    });
    expect(screen.getByRole('heading', { name: 'Aprovado' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Reprovado' })).toBeTruthy();
  });

  it.each(REGISTRATIONS_MOCK)(
    'Should render registration card for %# registration',
    async (registration) => {
      render(<RenderComponent />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: registration.employeeName }),
        ).toBeTruthy();
      });
    },
  );

  it('Should go to NewUser page', async () => {
    render(<RenderComponent />);

    const button = await screen.findByRole('button', {
      name: /Nova Admissão/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith(routes.newUser);
    });
  });

  it('Should refresh registrations', async () => {
    render(<RenderComponent />);

    const button = await screen.findByRole('button', {
      name: /Atualizar/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('.', { replace: true });
    });
  });

  it('Should search registrations', async () => {
    render(<RenderComponent />);

    const field = await screen.findByPlaceholderText('Digite um CPF válido');

    userEvent.type(field, '78502270001');

    await waitFor(() => {
      expect(mockedSetSearchParam).toHaveBeenCalledWith({ cpf: '78502270001' });
    });
  });

  it('Should approve registration', async () => {
    render(<RenderComponent />);

    const button = await screen.findAllByRole('button', {
      name: /Aprovar/i,
    });

    fireEvent.click(button[0]);

    const confirm = await screen.findByRole('button', { name: /Confirmar/i });

    fireEvent.click(confirm);

    expect(
      await screen.findByText(
        `${REGISTRATIONS_MOCK[0].employeeName} aprovado(a)`,
      ),
    ).toBeInTheDocument();
  });

  it('Should reprove registration', async () => {
    render(<RenderComponent />);

    const button = await screen.findAllByRole('button', {
      name: /Reprovar/i,
    });

    fireEvent.click(button[0]);

    const confirm = await screen.findByRole('button', { name: /Confirmar/i });

    fireEvent.click(confirm);

    expect(
      await screen.findByText(
        `${REGISTRATIONS_MOCK[0].employeeName} reprovado(a)`,
      ),
    ).toBeInTheDocument();
  });

  it('Should review again registration', async () => {
    render(<RenderComponent />);

    const button = await screen.findAllByRole('button', {
      name: /Revisar novamente/i,
    });

    fireEvent.click(button[0]);

    const confirm = await screen.findByRole('button', { name: /Confirmar/i });

    fireEvent.click(confirm);

    expect(
      await screen.findByText(
        `${REGISTRATIONS_MOCK[1].employeeName} pronto(a) para ser revisado(a)`,
      ),
    ).toBeInTheDocument();
  });

  it('Should delete registration', async () => {
    render(<RenderComponent />);

    const button = await screen.findAllByRole('button', { name: /Remover/i });

    fireEvent.click(button[0]);

    const confirm = await screen.findByRole('button', { name: /Confirmar/i });

    fireEvent.click(confirm);

    expect(
      await screen.findByText(
        `${REGISTRATIONS_MOCK[0].employeeName} removido(a)`,
      ),
    ).toBeInTheDocument();
  });
});
