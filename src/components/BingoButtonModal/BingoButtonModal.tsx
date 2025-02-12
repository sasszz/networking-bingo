import { useState } from "react";
import { EmailAutoComplete } from "../EmailAutoComplete";
import styles from "./BingoButtonModal.module.scss";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";
import { openLink } from "../utilities";

interface BingoButtonModalProps {
  label: string;
  onClose: () => void;
  onSuccess: (entry: {
    name: string;
    email?: string;
    linkedInLink?: string;
  }) => void;
  completed?: boolean;
}

export const BingoButtonModal = ({
  label,
  onClose,
  onSuccess,
  completed = false,
}: BingoButtonModalProps) => {
  const [email, setEmail] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(completed);
  const [emailError, setEmailError] = useState(false);
  const [linkedInError, setLinkedInError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLinkedIn = (link: string) =>
    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(link);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!email.trim() && !linkedInLink.trim()) {
      setEmailError(true);
      setLinkedInError(true);
      isValid = false;
    } else {
      setEmailError(false);
      setLinkedInError(false);
    }

    if (email.trim() && !validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (linkedInLink.trim() && !validateLinkedIn(linkedInLink)) {
      setLinkedInError(true);
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitted(true);
    onSuccess({ name, email, linkedInLink });
  };

  const handleEdit = () => {
    setTimeout(() => setIsSubmitted(false), 0);
  };

  const errorMessages: string[] = [];
  if (nameError) errorMessages.push("enter your new friend's name.");
  if (linkedInError && !emailError)
    errorMessages.push("LinkedIn link is in an invalid format.");
  if (emailError)
    errorMessages.push(
      "enter either an email address or a LinkedIn profile link for your new friend."
    );

  return (
    <div className={styles.opacityBackground}>
      <div className={styles.main}>
        <div className={styles.close}>
          <IconButton icon={SvgIcons.Close} onClick={onClose} />
        </div>
        <div className={styles.centerBody}>
          <h2>{label}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div
              className={
                linkedInError ? styles.linkedInError : styles.linkedInNoError
              }
            >
              <p className="text-end">Email or LinkedIn*</p>
              <label className={styles.label}>
                Email*
                <EmailAutoComplete
                  value={email}
                  onChange={(value) => setEmail(value)}
                  disabled={isSubmitted}
                  error={emailError}
                />
              </label>
              <p>or</p>
              <div className={styles.linkedInRow}>
                <input
                  className={linkedInError ? styles.error : styles.noError}
                  type="text"
                  placeholder="LinkedIn Profile Link"
                  value={linkedInLink}
                  onChange={(e) => setLinkedInLink(e.target.value)}
                  disabled={isSubmitted}
                />
                <IconButton
                  icon={SvgIcons.LinkedIn}
                  onClick={() => openLink(linkedInLink)}
                  disabled={!isSubmitted || !linkedInLink.trim()}
                />
              </div>
            </div>
            <label className={styles.label}>
              Name*
              <input
                className={nameError ? styles.error : styles.noError}
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
                className={styles.noError}
                type="text"
                placeholder="Enter a company..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isSubmitted}
              />
            </label>
            {!isSubmitted ? (
              <Button buttonText="Submit" type="submit" />
            ) : (
              <Button buttonText="Edit" type="button" onClick={handleEdit} />
            )}
          </form>
          {errorMessages.length > 0 && (
            <div className={styles.errorsText}>
              <p>
                the game is trust based, but we can&apos;t make it too easy!
              </p>
              {errorMessages.map((message, index) => (
                <p key={index} className={styles.errorText}>
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
