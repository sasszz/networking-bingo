"use client";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <div className={styles.opacityBackground}>
      <div className={styles.main}>
        <div className={styles.close}>
          <IconButton icon={SvgIcons.Close} onClick={onCancel} />
        </div>
        <div className={styles.centerBody}>
          <p>{message}</p>
          <div className="flex flex-row gap-4">
            <Button
              onClick={onConfirm}
              buttonText={"Yes i want to Cancel"}
              destructive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
