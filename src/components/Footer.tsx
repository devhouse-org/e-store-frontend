import {
  Home,
  Mail,
  Paperclip,
  Phone,
  Pin,
  Recycle,
  Shield,
  UsersRound,
} from "lucide-react";
import location from "../assets/images/location.png";
// import cash from "../assets/images/cash.png";

import apple from "../assets/images/app_store_logo/apple.png";
import google from "../assets/images/app_store_logo/google.png";
import huawei from "../assets/images/app_store_logo/huawei.png";

// import mcLogo from "../assets/mc-logo.svg";
import zainLogo from "../assets/images/payments/zain cash.png";
import cash from "../assets/images/payments/cash.png";
import mcLogo from "../assets/images/payments/master.png";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-blue-800 overflow-hidden">
      <div className="py-4  px-12">
        <h1 className="font-tajawal-medium my-4 text-orange-400 text-2xl">
          متواجدون دائماً لمساعدتكم
        </h1>
        <div className="top flex flex-col gap-y-4 md:flex-row md:gap-y-0 justify-between ">
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 gap-x-12">

            <div className="flex-1">
              <div className="">
                <h1 className="font-tajawal-medium text-white border-b border-b-light-800">
                  روابط سريعة
                </h1>
                <div className="flex gap-4 py-4 justify-center md:justify-normal">
                  <ul className="text-white font-tajawal-medium">
                    <li><Link to="/">الرئيسية</Link></li>
                    <li><Link to="/auctions">المزاد</Link></li>
                    <li><Link to="/blog">التدوينات</Link></li>
                    <li><Link to="/brands">الماركات التجارية</Link></li>
                    <li><Link to="/products">تسوق</Link></li>
                  </ul>
                  {/* <div className="gap-y-4 flex max-w-[450px] md:max-w-auto flex-row w-full md:w-auto justify-between md:flex-col items-center">
                    <div className="bg-black flex justify-center md:justify-normal p- rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={zainLogo}
                        alt=""
                      />
                    </div>
                    <div className="bg-black flex justify-center p4 rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={mcLogo}
                        alt=""
                      />
                    </div>
                    <div className="bg-black flex justify-center p4 rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={cash}
                        alt=""
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="">
                <h1 className="font-tajawal-medium text-white border-b border-b-light-800">
                  تواصل معنا
                </h1>
                <div className="flex gap-x-4 py-2 md:py-4">
                  <Phone className="text-white" />
                  <div className="gap-x-4 items-center">
                    <p className="text-white">9647712345643+</p>
                    <p className="text-white">9647812345643+</p>
                  </div>
                </div>
                <div className="flex gap-x-4 py-2 md:py-4">
                  <Mail className="text-white" />
                  <div className="gap-x-4 items-center">
                    <p className="text-white">info@estoreiraq.com</p>
                  </div>
                </div>
                <div className="flex gap-x-4 py-2 md:py-4">
                  <Pin className="text-white" />
                  <div className="gap-x-4 items-center">
                    <p className="text-white font-tajawal-regular">
                      العراق - البصرة - شارع الجزائر
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="">
                <h1 className="font-tajawal-medium text-white border-b border-b-light-800">
                  طرق الدفع
                </h1>
                <div className="flex gap-x-4 py-4 justify-center md:justify-normal">
                  <div className="gap-y-4 flex max-w-[450px] md:max-w-auto flex-row w-full md:w-auto justify-between md:flex-col items-center">
                    <div className="bg-black flex justify-center md:justify-normal p- rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={zainLogo}
                        alt=""
                      />
                    </div>
                    <div className="bg-black flex justify-center p4 rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={mcLogo}
                        alt=""
                      />
                    </div>
                    <div className="bg-black flex justify-center p4 rounded-md">
                      <img
                        className="w-[140px] h-[60px] object-contain"
                        src={cash}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div>
            <div className="header">
              <div>
                <h1 className="font-tajawal-medium text-white border-b border-b-light-800 text-[1.2rem]">
                  نوصلك لكل مكان
                </h1>

                <div className="flex gap-x-4 items-center">
                  <div className="w-full h-[250px] mt-2">
                    <img
                      src={location}
                      alt="e-store location"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex gap-x-4 py-4 justify-center md:justify-normal">
                  <div className="gap-y-4 gap-x-4 max-w-[450px] md:max-w-auto md:gap-x-2 flex flex-row w-full md:w-auto justify-between items-center">
                    <div className="flex justify-center md:justify-normal p4 rounded-md">
                      <img className="" src={huawei} alt="" />
                    </div>
                    <div className="flex justify-center p4 rounded-md">
                      <img className="" src={google} alt="" />
                    </div>
                    <div className="flex justify-center p4 rounded-md">
                      <img className="" src={apple} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-orange-500 text-white font-bold flex flex-col md:flex-row justify-between py-2 px-12 items-center">
        <ul className="flex items-center flex-wrap justify-between gap-x-8 gap-y-2 md:gap-y-0 font-tajawal-regular list-none">
          <li className="flex gap-x-2 items-center flex-1">
            <Paperclip />
            <p className="text-[12px] text-nowrap md:text-[14px]">
              الشروط والاحكام
            </p>
          </li>
          <li className="flex gap-x-2 items-center flex-1 md:flex-auto">
            <Shield />
            <p className="text-[12px] text-nowrap md:text-[14px]">
              سياسة الخصوصية
            </p>
          </li>
          <li className="flex gap-x-2 items-center flex-1 md:flex-auto">
            <Recycle />
            <p className="text-[12px] text-nowrap md:text-[14px]">
              سياسة الاسترجاع
            </p>
          </li>
          <li className="flex gap-x-2 items-center flex-1 md:flex-auto">
            <UsersRound />
            <p className="text-[12px] text-nowrap md:text-[14px]">من نحن</p>
          </li>
        </ul>
        <h1 className="font-tajawal-regular text-[12px] mt-4 md:mt-0 md:text-[14px]">
          حقوق النشر 2024 متجر ي ستور. جميع الحقوق محفوظة.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
