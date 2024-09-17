import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Dialog } from '.';

const mockOnConfirm = jest.fn();

const DialogRender = () => {
  return (
    <Dialog description="Descrição teste" onConfirm={mockOnConfirm}>
      Abrir
    </Dialog>
  );
};

describe('Dialog', () => {
  it('Should show dialog correcly', () => {
    render(<DialogRender />);

    const button = screen.getByRole('button', {
      name: /Abrir/i,
    });

    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText('Descrição teste')).toBeTruthy();
    });

    const confirm = screen.getByRole('button', { name: /Confirmar/i });

    fireEvent.click(confirm);

    waitFor(() => {
      expect(screen.getByText('Descrição teste')).not.toBeTruthy();
    });
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
