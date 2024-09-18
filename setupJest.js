require('jest-fetch-mock').enableMocks();
require('@testing-library/user-event').userEvent.setup();

afterEach(() => {
  jest.clearAllMocks();
});
