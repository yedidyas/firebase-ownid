import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/dashboard', { replace: true })
    }, [user, loading]);
    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = `
         (function (w, d, s, u, o, e, p, a) {w[o] = w[o] || function () {
        a=arguments,(w[o].q = w[o].q || []).push(a);'function'==typeof a[a.length - 1]&&a[a.length - 1](Promise.resolve())},
        e = d.createElement(s), p = d.getElementsByTagName(s)[0];e.src = u;e.async = 1;p.parentNode.insertBefore(e, p)
        })(window, document, 'script', 'https://cdn.ownid.com/js/firebase-sdk.es5.js', 'ownid');
        ownid('init', {serverUrl: 'https://0exby31e3svoq7.server.ownid.com/ownid'});
        
          ownid('login', {
      loginIdField: document.getElementById('email'),
      passwordField: document.getElementById('password'),
      submitButton: document.getElementById('submit'),
      onSuccess: () => {
        alert('OwnID login!');
      },
    });
        `
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);
    return (
        <div className="login">
            <div className="login__container">
                <input
                    id="email"
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    id="password"
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    id="submit"
                    className="login__btn"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;