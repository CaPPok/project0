import React, { useState, useEffect } from "react";
import "./Login.css"
import { useMediaQuery } from 'react-responsive';

const Login = ({ onStart }) => {
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("dangnhap"); // tab mặc định

  const handleStart = () => {
    //kiểm tra tên có bị rỗng hay không
    if (name.trim() === "") return;

    onStart(name);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // cái này phải được trước liền kề return;

  return (
    <div 
      className="login-background"
      style={{
        backgroundImage: "url('/login_bg_3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    > 
      <div className={`login-container ${isMobile ? 'mobile' : 'laptop'}`}>
        {/*Thanh điều hướng*/}
        <nav className={`login-navbar ${isMobile ? 'mobile' : 'laptop'}`}>
          <div className={`login-navbar-title ${isMobile ? 'mobile' : 'laptop'}`}>
            Be VietNam Pro
          </div>
          <div className={`login-navbar-links ${isMobile ? 'mobile' : 'laptop'}`}>
            <a
              href="#"
              className={activeTab === "gioithieu" ? "active" : ""}
              onClick={() => setActiveTab("gioithieu")}
            >
              Giới thiệu
            </a>
            <a
              href="#"
              className={activeTab === "hotro" ? "active" : ""}
              onClick={() => setActiveTab("hotro")}
            >
              Hỗ trợ
            </a>
            <a
              href="#"
              className={activeTab === "lienhe" ? "active" : ""}
              onClick={() => setActiveTab("lienhe")}
            >
              Liên hệ
            </a>
            <a
              href="#"
              className={activeTab === "dangnhap" ? "active" : ""}
              onClick={() => setActiveTab("dangnhap")}
            >
              Đăng nhập
            </a>
          </div>
        </nav>
        {/* Nội dung của thanh điều hướng */}
        <div className="login-tab-content">
          {activeTab === "gioithieu" && (
            <div className="login-tab-box">
              <h2>Giới thiệu</h2>
              <p>Đây là phần giới thiệu về trang web...</p>
            </div>
          )}
          {activeTab === "hotro" && (
            <div className="login-tab-box">
              <h2>Hỗ trợ</h2>
              <p>Nội dung hỗ trợ...</p>
            </div>
          )}
          {activeTab === "lienhe" && (
            <div className="login-tab-box">
              <h2>Liên hệ</h2>
              <p>Email: *********@gmail.com</p>
              <p>SĐT: **********</p>
            </div>
          )}
          {activeTab === "dangnhap" && (
            <div className="login-tab-box">
              <h2>Đăng nhập</h2>
              <p>Tên đăng nhập</p>
              <input
                type="text"
                placeholder="Nhập tên để bắt đầu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p>Mật khẩu (Không cần nhập do chưa làm xong :3)</p>
              <input
                type="password"
                placeholder=""
              />
              <button
                onClick={handleStart}
                disabled={name.trim() === ""}
              >
                Bắt đầu chơi
                <div class="login-tab-box-triangle"></div>                            
              </button>
            </div>
          )}
        </div>
        <div className={`login-left ${isMobile ? 'mobile' : 'laptop'}`}>
          <div className={`login-slogan ${isMobile ? 'mobile' : 'laptop'}`}>
            Thể thao là không ngừng bỏ cuộc
          </div>
          <div className={`login-title ${isMobile ? 'mobile' : 'laptop'}`}>
            QUIZ
            <p>
              Ở đây có các câu hỏi về nhiều địa danh, thắng cảnh đẹp trên toàn thế giới. Chúng tôi sẽ đem đến cho bạn nhiều trải nghiệm tuyệt vời.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={`login-container ${isMobile ? 'mobile' : 'laptop'}`}>
  //     <div className={`login-left ${isMobile ? 'mobile' : 'laptop'}`}>
  //       <h1 className={`login-title ${isMobile ? 'mobile' : 'laptop'}`}>
  //         CHÀO MỪNG BẠN !
  //       </h1>
  //       <p className={`login-decription ${isMobile ? 'mobile' : 'laptop'}`}>Hãy cùng tìm hiểu về Quân khu 7</p>
  //       <input
  //         type="text"
  //         placeholder="Nhập tên để bắt đầu..."
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         className={`login-input ${isMobile ? 'mobile' : 'laptop'}`}
  //       />
  //       <div className={`login-button-grid ${isMobile ? 'mobile' : 'laptop'}`}>
  //         <button
  //           className={`login-button ${isMobile ? 'mobile' : 'laptop'}`}
  //           onClick={handleStart}
  //           disabled={name.trim() === ""}
  //         >
  //           Bắt đầu chơi
  //         </button>
  //         <button
  //           className={`rules-toggle-button ${isMobile ? 'mobile' : 'laptop'}`}
  //           onClick={() => toggleDrawer("rules")}
  //         >
  //           Luật chơi
  //         </button>
  //         <button
  //           className={`inst-toggle-button ${isMobile ? 'mobile' : 'laptop'}`}
  //           onClick={() => toggleDrawer("inst")}
  //         >
  //           Giới thiệu
  //         </button>
  //       </div>
  //     </div>

  //     <div className={`login-right ${isMobile ? 'mobile' : 'laptop'}`}>
  //       <div className={`img-transition ${isMobile ? 'mobile' : 'laptop'}`}>
  //         <div className={`img-transition-track ${isMobile ? 'mobile' : 'laptop'}`}>
  //           <img src="img-login-1.png"/>
  //           <img src="img-login-2.jpg"/>
  //           <img src="img-login-3.jpg"/>
  //           <img src="img-login-4.jpg"/>
  //           {/* clone ảnh */}
  //           <img src="img-login-1.png"/>
  //           <img src="img-login-2.jpg"/>
  //           <img src="img-login-3.jpg"/>
  //           <img src="img-login-4.jpg"/>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Khung luật chơi trượt từ dưới lên */}
  //     <div className={`rules-drawer ${isMobile ? 'mobile' : 'laptop'} ${showRules ? "show" : ""}`}>
  //       <div className={`rules-content ${isMobile ? 'mobile' : 'laptop'}`}>
  //         <div className={`rules-text ${isMobile ? 'mobile' : 'laptop'}`}>📜 Luật chơi:</div>
  //         <ul>
  //           <li>🕒 Mỗi câu hỏi có 20 giây để trả lời.</li>
  //           <li>✅ Chọn đúng sẽ được cộng 10 và điểm thưởng.</li>
  //           <li>🎁 Trả lời càng nhanh điểm thưởng càng cao.</li>
  //           <li>❌ Trả lời sai hoặc hết giờ sẽ không được điểm.</li>
  //           <li>🔚 Khi kết thúc, điểm và bảng xếp hạng sẽ được hiển thị.</li>
  //         </ul>
  //       </div>
  //     </div>

  //     {/* Khung giới thiệu trượt từ dưới lên */}
  //     <div className={`inst-drawer ${isMobile ? 'mobile' : 'laptop'} ${showInst ? "show" : ""}`}>
  //       <div className={`inst-content ${isMobile ? 'mobile' : 'laptop'}`}>
  //         <div className={`inst-text ${isMobile ? 'mobile' : 'laptop'}`}>📜 Giới thiệu:</div>
  //         <ul>
  //           <li>Giới thiệu về Quân khu 7 ...</li>
  //         </ul>
  //       </div>
  //     </div>

  //     <div className={`login-footer-strip ${isMobile ? 'mobile' : 'laptop'}`}></div>
  //   </div>
  // );
};

export default Login;