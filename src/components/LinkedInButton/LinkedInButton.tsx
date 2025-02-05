import styles from "./LinkedInButton.module.scss";
import Image from "next/image";
import LinkedIn from "../../../public/linkedin.svg";

interface LinkedInButtonProps {
  username: string;
  disabled?: boolean;
}

export const LinkedInButton = ({ username, disabled }: LinkedInButtonProps) => {
  const link = `https://www.linkedin.com/in/${username}/`;
  console.log(disabled);

  const handleClick = () => {
    if (!disabled) {
      window.open(link, "_blank");
    }
  };

  return (
    <button
      className={`${styles.main} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
    >
      <Image src={LinkedIn} alt="LinkedIn icon" className={styles.icon} />
    </button>
  );
};
