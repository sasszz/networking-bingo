// import styles from "./GameDisplayCard.module.scss";
import Image from "next/image";
import Upcoming from "../../../public/scheduled.svg";
import GameOver from "../../../public/game-over.png";
import Person from "../../../public/person.svg";
import { MiniBingoCard } from "../MiniBingoCard";
import { LiveIcon } from "../LiveIcon";

export const GameDisplayCard = ({}) => {
  return (
    <div className=" flex flex-col gap-4 p-4">
      <div className="rounded flex flex-row gap-4 bg-gray-200 items-center justify-center p-4">
        <div className="flex flex-col w-fit">
          <MiniBingoCard type="one-line" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p>bingo game</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={Upcoming} alt="Clock Icon" width={25} height={25} />
            <p>scheduled</p>
          </div>
          <p>start time</p>
          <p>duration: 3 hours</p>
        </div>
      </div>
      <div className="rounded flex flex-row gap-4 bg-gray-200 items-center justify-center p-4">
        <div className="flex flex-col w-fit">
          <MiniBingoCard type="one-line" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p>bingo game</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <LiveIcon />
            <p>Live</p>
          </div>
          <p>time left</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={Person} alt="Person Icon" width={25} height={25} />
            <p>6 players</p>
          </div>
        </div>
      </div>
      <div className="rounded flex flex-row gap-4 bg-gray-200 items-center justify-center p-4">
        <div className="flex flex-col w-fit">
          <MiniBingoCard type="one-line" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p>bingo game</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={GameOver} alt="GameOver Icon" width={25} height={25} />
            <p>Ended</p>
          </div>
          <p>end time</p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={Person} alt="Person Icon" width={25} height={25} />
            <p>6 players</p>
          </div>
        </div>
      </div>
    </div>
  );
};
