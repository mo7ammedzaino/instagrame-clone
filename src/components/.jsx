import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const handleRegister = async (e) => {
  try {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: username });
    SettingsSuggestRounded({ ...res.user, displayName });
  } catch (error) {
    console.error("o'h td", error);
  }
};
const handleLogout = (e) => {
  setUser(null);
};
