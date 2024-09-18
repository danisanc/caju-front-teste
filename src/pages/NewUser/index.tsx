import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useHookFormMask } from 'use-mask-input';

import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as Api from '~/services/api';

import { newUserSchema } from './schema';
import * as S from './styles';

type FormType = {
  name: string;
  email: string;
  cpf: string;
  date: string;
};

const NewUserPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(newUserSchema),
  });
  const registerWithMask = useHookFormMask(register);

  const goToHome = () => {
    navigate(routes.dashboard);
  };

  const onSubmit = (data: FormType) => {
    const formattedCpf = data.cpf.replace(/[^0-9]/g, '');
    const formattedDate = Intl.DateTimeFormat('pt-BR').format(
      new Date(data.date),
    );

    Api.post('registrations', {
      admissionDate: formattedDate,
      email: data.email,
      employeeName: data.name,
      status: 'REVIEW',
      cpf: formattedCpf,
    })
      .then(() => {
        toast.success(`${data.name} cadastrado(a) com sucesso`);
        goToHome();
      })
      .catch(() => {
        toast.error(`Erro ao tentar cadastrar candidato(a)`);
      });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <TextField
          {...register('name')}
          error={errors.name}
          placeholder="Nome"
          label="Nome"
        />

        <TextField
          {...register('email')}
          error={errors.email}
          placeholder="Email"
          label="Email"
          type="email"
        />

        <TextField
          {...registerWithMask('cpf', '999.999.999-99')}
          error={errors.cpf}
          placeholder="CPF"
          label="CPF"
        />

        <TextField
          {...register('date')}
          error={errors.date}
          label="Data de admissão"
          type="date"
        />

        <Button onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
