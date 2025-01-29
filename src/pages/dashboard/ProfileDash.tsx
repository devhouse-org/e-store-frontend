import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import x from "/src/assets/images/x.svg";

const ProfileDash: React.FC = () => {
  return (
    <div className="h-screen p6 pt-14 mx-4 md:mx-0">
      <Card className="h-[80vh] max-h-[800px] container mx-auto">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col h-full">
            <div className="grid gap-8 md:grid-cols-2 md:grid-flow-col-reverse flex-1">
              {/* Decorative Image with iPhone Frame */}
              <div className="hidden md:block h-full">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="src/assets/images/login_bg.webp"
                    alt="Decorative"
                    className="absolute inset-0 object-cover w-full h-full rounded-r-lg"
                  />
                </div>
              </div>

              {/* Welcome Section */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <img
                  src="src/assets/images/Logo.png"
                  alt="E-store Logo"
                  className="h-8 mb-8"
                />
                <h2 className="text-3xl font-tajawal-bold">أهلاً بك!</h2>
                <p className="text-muted-foreground text-center max-w-[400px] font-tajawal-regular">
                  سجل الدخول واستمتع بتجربة تسوق فريدة للأحدث الأجهزة
                  والإلكترونيات نتطلع لخدمتك!
                </p>

                <div className="w-full max-w-[400px] space-y-4 flex flex-col mt-4">
                  <Link to="/login">
                    <Button
                      label="تسجيل الدخول"
                      className="w-full bg-[#D35A3B] hover:bg-[#bf4f33] h-11 font-tajawal-medium"
                    />
                  </Link>
                  <Link to="/signup">
                    <Button
                      label="إنشاء حساب"
                      variant="outline"
                      className="w-full h-11 font-tajawal-medium"
                    />
                  </Link>
                </div>

                <div className="flex items-center gap-4 w-full max-w-[400px] my-4">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground font-tajawal-regular">
                    أو
                  </span>
                  <Separator className="flex-1" />
                </div>

                <button className="w-full max-w-[400px] h-11 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-tajawal-medium">
                  <p className="mt-1.5">
                    التسجيل باستخدام
                  </p>
                  <img
                    src="src/assets/images/google.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                </button>

                <button className="flex hover:bg-black/90 justify-center items-center gap-2 w-full max-w-[400px] bg-black text-white rounded-lg p-2 font-tajawal-medium">
                  <p className="mt-1.5">
                    التسجيل باستخدام

                  </p>
                  <img
                    src="src/assets/images/apple.png"
                    alt="Apple"
                    className="w-5 h-5"
                  />
                </button>

                {/* Social Media Links */}
                <div className="text-center w-full max-w-[400px] mt-6">
                  <p className="text-gray-600 mb-3 font-tajawal-regular">
                    تابعنا على
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="#"
                      className="text-[#D35A3B] hover:text-[#bf4f33] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-[#D35A3B] hover:text-[#bf4f33] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-[#D35A3B] hover:text-[#bf4f33] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                    </a>

                    <img src={x} alt="X" className="w-5 h-5" />
                    {/* <a
                      href="#"
                      className="text-[#D35A3B] hover:text-[#bf4f33] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.8 5.1L8.1 12c-.1.2-.3.4-.5.4s-.4-.1-.5-.3L5.2 9.2c-.2-.3-.1-.7.2-.9.3-.2.7-.1.9.2l1.2 1.8 3.1-5.7c.2-.3.6-.4.9-.3.3.2.4.6.3.8z" />
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDash;
