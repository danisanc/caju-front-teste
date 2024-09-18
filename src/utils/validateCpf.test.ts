import { validateCpf } from './validateCpf';

describe('ValidateCpf function', () => {
  test('Should return true for correct cpf', () => {
    expect(validateCpf('785.022.700-01')).toEqual(true);
  });

  test('Should return false for wrong cpf', () => {
    expect(validateCpf('999.999.999-99')).toEqual(false);
    expect(validateCpf('123.456.789-10')).toEqual(false);
    expect(validateCpf('101.432.567-89')).toEqual(false);
  });
});
