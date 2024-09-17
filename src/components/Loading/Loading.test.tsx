import { render, screen } from '@testing-library/react';

import Loading from '.';

describe('Loading', () => {
  it('Should show loading correcly', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
