import { PropsWithChildren } from 'react';

import * as AlertDialog from './styles';

export type DialogProps = {
  description: string;
  onConfirm: () => void;
} & PropsWithChildren;

export const Dialog = (props: DialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{props.children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Tem certeza?</AlertDialog.Title>
          <AlertDialog.Description>{props.description}</AlertDialog.Description>

          <AlertDialog.Actions>
            <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
            <AlertDialog.Action onClick={props.onConfirm}>
              Confirmar
            </AlertDialog.Action>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
