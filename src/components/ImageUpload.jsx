import { Button, Input } from "@mui/material";
import { postsRef, storage } from "../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import "../Css/imageupload.css";

const ImageUpload = ({ username }) => {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const imageName = `${image.name}${Date.now()}`;
      const storageRef = ref(storage, `images/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      const observerFunction = (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      };

      const errorHandler = (error) => {};

      const unsubscribeHandler = async () => {
        const fullPath = (await uploadTask).ref.fullPath;
        const uploadedFileRef = ref(storage, fullPath);
        const url = await getDownloadURL(uploadedFileRef);

        await addDoc(postsRef, {
          caption,
          imageURL: url,
          username,
          timestamp: serverTimestamp(),
        });

        // إعادة تعيين الحقول بعد الرفع بنجاح
        setCaption("");
        setImage(null);
        setProgress(0);
      };

      uploadTask.on(
        "state_changed",
        observerFunction,
        errorHandler,
        unsubscribeHandler
      );
    } catch (error) {
      console.error("حدث خطأ أثناء رفع الصورة:", error);
      // يمكنك إظهار رسالة خطأ للمستخدم هنا
    }
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max={100} />
      <Input
        placeholder="أدخل تعليقًا.."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div>
        <input type="file" onChange={handleChange} />
        {!!image && (
          <Button className="imageupload__button" onClick={handleUpload}>
            رفع
          </Button>
        )}
      </div>

      <br />
    </div>
  );
};

export default ImageUpload;
