import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "./firebase";
import "./Register.css";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate('/dashboard', { replace: true })
    }, [user, loading]);
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.innerHTML = `
         (function (w, d, s, u, o, e, p, a) {w[o] = w[o] || function () {
        a=arguments,(w[o].q = w[o].q || []).push(a);'function'==typeof a[a.length - 1]&&a[a.length - 1](Promise.resolve())},
        e = d.createElement(s), p = d.getElementsByTagName(s)[0];e.src = u;e.async = 1;p.parentNode.insertBefore(e, p)
        })(window, document, 'script', 'https://cdn.ownid.com/js/firebase-sdk.es5.js', 'ownid');
        ownid('init', {serverUrl: 'https://vyh8i32u1u5cjj.server.dev.ownid.com/ownid'});

        `;

        const script3 = document.createElement('script');
        script3.innerHTML = `
              ownid('register', {
      passwordField: document.getElementById('password'),
      confirmPasswordContainer: document.getElementById('password'),
      loginIdField:  document.getElementById('email')
    });        `;
        document.body.appendChild(script1);
        document.body.appendChild(script3);


        return () => {

        }
    }, []);
    return (
        <div className="register">
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input
                    id="email"
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    id="password"
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="register__btn" onClick={register}>
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Register;