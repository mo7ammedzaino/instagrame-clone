import "./Css/app.css"; // تأكد من استخدام الحروف الصغيرة لـ "Css"
import Header from "./components/Header"; // استخدم العلامة "./" للإشارة إلى الملفات المحلية
import { auth, postsRef } from "./firebase";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SignInModal from "components/SignInModal";
import SIgnUpModal from "components/SignUpModal";
import ImageUpload from "components/ImageUpload";
import Posts from "components/Posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    onSnapshot(query(postsRef, orderBy("timestamp", "desc")), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));

      setPosts(docs);
    });
  }, []);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      setLoginOpen(false);
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
    }
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: username });
      setUser({ ...res.user, displayName: username });
      setRegisterOpen(false);
    } catch (error) {
      console.error("خطأ في إنشاء حساب:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app">
      <SignInModal
        onClose={setLoginOpen}
        open={loginOpen}
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
      <SIgnUpModal
        email={email}
        onClose={setRegisterOpen}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onRegister={handleRegister}
        open={registerOpen}
        password={password}
      />

      <Header
        user={user}
        onSignIn={setLoginOpen}
        onSignUp={setRegisterOpen}
        onLogout={handleLogout}
      />

      <Posts user={user} posts={posts} />

      {user ? (
        <ImageUpload username={user?.displayName} />
      ) : (
        <h3 className="imageupload__error"> Sorry you need to login upload</h3>
      )}
    </div>
  );
};

export default App;
