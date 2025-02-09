import { useState } from "react";
import { EmailAutoComplete } from "../EmailAutoComplete";
import styles from "./BingoButtonModal.module.scss";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";
import { openLink } from "../utilities";

interface BingoButtonModalProps {
  label: string;
  onClose: () => void;
  onSuccess: () => void;
  completed?: boolean;
}

export const BingoButtonModal = ({
  label,
  onClose,
  onSuccess,
  completed = false,
}: BingoButtonModalProps) => {
  const [email, setEmail] = useState("");
  const [linkedInUsername, setLinkedInUsername] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    setIsSubmitted(true);
    onSuccess();
  };

  const handleEdit = () => {
    setTimeout(() => setIsSubmitted(false), 0);
  };

  const link = `https://www.linkedin.com/in/${linkedInUsername}/`;

  return (
    <div className={styles.opacityBackground}>
      <div className={styles.main}>
        <div className={styles.close}>
          <IconButton icon={SvgIcons.Close} onClick={onClose} />
        </div>
        <h2>{label}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            linkedin.com/in/
            <input
              className={styles.input}
              type="text"
              placeholder="username"
              value={linkedInUsername}
              onChange={(e) => setLinkedInUsername(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          <IconButton
            icon={SvgIcons.LinkedIn}
            onClick={() => openLink(link)}
            disabled={!isSubmitted}
          />
          <label className={styles.label}>
            Email
            <EmailAutoComplete
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (value.trim()) setError(false);
              }}
              disabled={isSubmitted}
            />
          </label>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          <label className={styles.label}>
            Company
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a company..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          {!isSubmitted ? (
            <Button buttonText="Submit" type="submit" disabled={error} />
          ) : (
            <Button buttonText="Edit" type="button" onClick={handleEdit} />
          )}
        </form>
      </div>
    </div>
  );
};
