import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";

type Props = {
  img?: string;
  name?: string;
  date?: string;
  comment?: string;
  rating: number;
};

const ReviewCard = ({ img, name, date, comment, rating }: Props) => {
  const imageUrl =
    "https://images.unsplash.com/photo-1732919258508-3fd53a8007b6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="flex bg-white p-4 shadow-md rounded-lg gap-x-8">
      <div className="img w-[50px] h-[50px] object-center rounded-full overflow-hidden">
        <img src={imageUrl} alt="" />
      </div>

      <div className="content">
        <div className="flex justify-between">
          <p className="font-tajawal-bold">{name}</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <>
                {rating >= index + 1 ? (
                  <TiStarFullOutline className="text-orange-400" />
                ) : (
                  <TiStarOutline className="text-slate-400" />
                )}
              </>
            ))}
          </div>
        </div>
        <p className="font-tajawal-regular">{date}</p>
        <p className="font-tajawal-regular">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
