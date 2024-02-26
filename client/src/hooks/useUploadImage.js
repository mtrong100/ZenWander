import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* <<=============================================================>> */

export default function useUploadImage() {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (file) => {
    setIsLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, "pictures/" + file.name + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        setImage("");
        console.log(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setIsLoading(false);
        });
      }
    );
  };

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadImage(file);
  };

  return {
    image,
    setImage,
    selectFile,
    isLoading,
  };
}
