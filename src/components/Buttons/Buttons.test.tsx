import { render, screen } from '@testing-library/react';
import { HiRefresh } from 'react-icons/hi';

import { IconButton } from './IconButton';

import Button from '.';

describe('Buttons', () => {
  it('Should show button', () => {
    render(<Button>Ativar</Button>);

    expect(screen.getByRole('button', { name: /ativar/i }));
  });

  it('Should show Icon Button', () => {
    const { container } = render(
      <IconButton>
        <HiRefresh />
      </IconButton>,
    );

    const svgEl = container.querySelector('svg');
    expect(svgEl).toBeInTheDocument();
  });
});
