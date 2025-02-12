import Image from "next/image";
import Person from "../../../public/person.svg";

interface PeopleLineProps {
  count: number;
}

export const PeopleLine: React.FC<PeopleLineProps> = ({ count }) => {
  const maxPerRow = 10;
  const firstRowCount = Math.min(count, maxPerRow);
  const secondRowCount =
    count > maxPerRow ? Math.min(count - maxPerRow, maxPerRow) : 0;

  return (
    <div className="flex flex-col items-center gap-1">
      <p>{count} players</p>
      <div className="flex gap-x-0">
        {Array.from({ length: firstRowCount }).map((_, i) => (
          <Image
            key={i}
            src={Person}
            alt="Person Icon"
            width={25}
            height={25}
          />
        ))}
      </div>
      {secondRowCount > 0 && (
        <div className="flex">
          {Array.from({ length: secondRowCount }).map((_, i) => (
            <Image
              key={i + maxPerRow}
              src={Person}
              alt="Person Icon"
              width={25}
              height={25}
            />
          ))}
        </div>
      )}
    </div>
  );
};
