import * as yup from 'yup';

import { validateCpf } from '~/utils/validateCpf';

export const newUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'Nome muito curto')
    .matches(/\s/, { message: 'Digite seu nome completo' })
    .test('validate-first-caracter', 'Digite um nome válido', (val) =>
      val ? isNaN(parseInt(val.charAt(0)) ?? '') : true,
    )
    .required('Digite seu nome'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Digite seu email'),
  cpf: yup
    .string()
    .test('validate-cpf', 'Digite um CPF válido', (val) =>
      validateCpf(val ?? ''),
    )
    .required('Digite seu CPF'),
  date: yup.string().required('Selecione uma data'),
});
