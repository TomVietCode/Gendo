import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginThunk from "../../redux/thunk/login";

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { auth } = useSelector((state) => state);

    const dispatch = useDispatch();

    function handleChangeInput(e) {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginThunk(login));
    }

    useEffect(() => {
        if (auth?.user) {
            navigate("/");
        }
    }, [auth?.user, navigate]);

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <div className="logo">
                    <img
                        src="https://media.discordapp.net/attachments/1045909556078854177/1348396365012799588/467775294_1086766406792449_195283251104119265_n_preview_rev_1.png?ex=67cf4f79&is=67cdfdf9&hm=d15fa9458ba60ed6d058ad7a9284567d0ec761482d0e5fccb29ee442f878c9e7&=&format=webp&quality=lossless&width=696&height=704"
                        alt="logo"
                    />
                </div>
                <h2 className="name">Quản lý dự án</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Email"
                        value={login.email}
                        name="email"
                        onChange={handleChangeInput}
                        required
                    />
                    <i className="bx bxs-envelope"></i>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        value={login.password}
                        onChange={handleChangeInput}
                        autoComplete="on"
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <button>Đăng nhập</button>
                <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link to={"/register"}>Đăng kí tại đây</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
