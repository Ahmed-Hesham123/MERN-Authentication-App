import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const maxSizeMB = 2;
    if (image.size / (1024 * 1024) > maxSizeMB) {
      console.error(`File size exceeds ${maxSizeMB} MB`);
      setImageError(true);
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error("Error uploading image:", error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {};
  const handleUpdate = (e) => {};
  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* Firebase Storage Rules :
                allow read;
                allow write: if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*')
        */}
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center text-sm">
          {imageError ? (
            <span className="text-red-700">
              Error Uploading Image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uplaoded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <Button disabled={loading} bgColor="bg-slate-700" type="submit">
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Up</span>
      </div>
    </div>
  );
};

export default Profile;
