import { useState } from "react";
import { ActionType, ResponseType } from "../enums";
import { IUser } from "../interfaces/IUser";

interface ModalState {
  user?: IUser | null;
  action: ActionType | null;
  isOpen: boolean;
}

export const UseModal = (
  onEdit: (user: IUser) => Promise<void>,
  onDelete: (id: string | number) => Promise<void>,
  onAdd: (user: IUser) => Promise<void>
) => {
  const [modalState, setModalState] = useState<ModalState>({
    user: null,
    action: null,
    isOpen: false,
  });

  const openModal = (user: IUser, action: ActionType) => {
    setModalState({ user, action, isOpen: true });
  };

  const closeModal = () => {
    setModalState({ user: null, action: null, isOpen: false });
  };

  const handleModalResponse = async (response: ResponseType, user?: IUser) => {
    if (modalState.user && modalState.action) {
      if (response === ResponseType.Confirm) {
        /* evaluación de la acción */
        switch (modalState.action) {
          /* Edición */
          case ActionType.Edit:
            await onEdit({ ...modalState.user, ...user });
            break;
          /* Eliminación */
          case ActionType.Delete:
            await onDelete(modalState.user.id);
            break;
          /* Agregado */
          case ActionType.Add:
            if (user) {
              await onAdd(user);
            }
            break;

          default:
            break;
        }
      }
      closeModal();
    }
  };

  return {
    modalState,
    openModal,
    closeModal,
    handleModalResponse,
  };
};
