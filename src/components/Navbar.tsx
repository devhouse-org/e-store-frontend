type Props = {
  hasAd?: boolean;
  adTitle?: string;
};

const Navbar = (props: Props) => {
  return (
    <div className="bg-green-100 rounded-lg overflow-hidden">
      {props.hasAd && (
        <div className="ad bg-orange-500 text-white font-bold flex justify-center items-center py-1">
          <h1>{props.adTitle}</h1>
        </div>
      )}

      <div
        dir="rtl"
        className="navigation flex items-center py-2 px-2 justify-between"
      >
        <ul className="flex gap-x-4 list-none flex-1">
          <li className="px-1 hover:bg-gray-500/50 font-tajawal-bold">الرئيسية</li>
          <li className="px-1 hover:bg-gray-500/50">Contact</li>
          <li className="px-1 hover:bg-gray-500/50">alskdj</li>
          <li className="px-1 hover:bg-gray-500/50">asdlifkj</li>
          <li className="px-1 hover:bg-gray-500/50">asldkfj</li>
        </ul>
        <div className="logo flex-1 flex justify-center items-center">
          Logo
        </div>
        <div dir="ltr" className="icons flex-1">
          Icons
        </div>
      </div>
    </div>
  );
};
export default Navbar;
