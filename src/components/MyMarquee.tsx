import Marquee from "react-fast-marquee";
import { memo } from "react";
import Apple from "/apple.png";
import Nintendo from "/nintendo.png";
import Realme from "/realme.png";
import Anker from "/Anker.png";
import Belkin from "/belkin.png";
import Meta from "/meta.png";
import Xiaomi from "/xiaomi.png";
import Oppo from "/oppo.png";
import Samsung from "/samsung.png";
import Sony from "/sony.png";

const techList = [
  { id: 1, name: "Apple", logo: Apple },
  { id: 2, name: "Nintendo", logo: Nintendo },
  { id: 3, name: "Realme", logo: Realme },
  { id: 4, name: "Anker", logo: Anker },
  { id: 5, name: "Belkin", logo: Belkin },
  { id: 6, name: "Meta", logo: Meta },
  { id: 7, name: "Xiaomi", logo: Xiaomi },
  { id: 8, name: "Oppo", logo: Oppo },
  { id: 9, name: "Samsung", logo: Samsung },
  { id: 10, name: "Sony", logo: Sony },
];

type Props = {};

const MyMarquee = memo(({}: Props) => {
  return (
    <div className="my-[10rem] sm:my-[2rem]  bg-gray-700 items-center md:my-[3rem] lg:my-[4rem] py-[6rem]">
      <Marquee
        autoFill={true} // Enable autofill for infinite loop
        loop={0} // Infinite loop
        speed={500} // Adjust speed for smoother scrolling
        direction="right"
        className="w-auto"
      >
        {techList.map((tech) => (
          <div key={tech.id} className="w-[100px] h-auto mx-[4rem]">
            <img
              className="w-full h-full object-scale-down items-center"
              src={tech.logo}
              alt={tech.name}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
});

export default MyMarquee;
