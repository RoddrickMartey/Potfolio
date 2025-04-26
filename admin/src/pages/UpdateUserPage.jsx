import React, { useEffect, useState } from "react";
import axiosInstance from "../app/axiosConfig";
import Joi from "joi";
import SocialLinkEdit from "../components/HomePage/SocialLinkEdit";
import SkillsEdit from "../components/HomePage/SkillsEdit";
import PhoneEdit from "../components/HomePage/PhoneEdit";

function UpdateUserPage() {
  const [user, setUser] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [skills, setSkills] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState({});

  const [submittingForm, setSubmittingForm] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const mainDetailSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    bio: Joi.string().min(10).required(),
  });

  const fetchUser = async () => {
    try {
      setLoadingUserData(true);
      const res = await axiosInstance.get("/me");
      setUser(res.data);
      setPhoneNumbers(res.data.phoneNumbers);
      setSocialLinks(res.data.socialLinks);
      setSkills(res.data.skills);
      setName(res.data.name);
      setEmail(res.data.email);
      setBio(res.data.bio);
    } catch (error) {
      console.error("Error fetching user:", error.response);
    } finally {
      setLoadingUserData(false);
    }
  };

  const mainDetailSubmit = async (e) => {
    e.preventDefault();

    const { error } = mainDetailSchema.validate(
      { name, email, bio },
      { abortEarly: false }
    );

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.context.key] = detail.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmittingForm(true);
      const data = {
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
        resume: user.resume,
        username: user.username,
      };
      try {
        await axiosInstance.patch("/update", data);
        fetchUser();
      } catch (err) {
        console.error("Submit error:", err);
      } finally {
        setSubmittingForm(false);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loadingUserData) {
    return (
      <section className="px-3 py-4 bg-white text-black min-h-screen">
        <p>Loading user info...</p>
      </section>
    );
  }

  return (
    <section className="px-3 py-4 bg-white text-black min-h-screen space-y-3">
      <h1 className="text-2xl font-semibold mb-4">Edit User Info</h1>

      <form
        className="p-4 border border-gray-300 rounded-md bg-white"
        onSubmit={mainDetailSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Main Details</h2>

        <div className="flex flex-col space-y-2 mb-3">
          <label className="font-semibold">Name :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 border border-gray-400 disabled:bg-gray-400"
            disabled={submittingForm}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className="flex flex-col space-y-2 mb-3">
          <label className="font-semibold">E-mail :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 border border-gray-400 disabled:bg-gray-400"
            disabled={submittingForm}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="flex flex-col space-y-2 mb-3">
          <label className="font-semibold">Bio :</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-1 border border-gray-400 h-40 disabled:bg-gray-400"
            disabled={submittingForm}
          />
          {errors.bio && <p>{errors.bio}</p>}
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
          disabled={submittingForm}
        >
          {submittingForm ? "Saving..." : "Save"}
        </button>
      </form>

      <SkillsEdit skills={skills} fetchUser={fetchUser} />
      <SocialLinkEdit socialLinks={socialLinks} fetchUser={fetchUser} />
      <PhoneEdit phoneNumbers={phoneNumbers} fetchUser={fetchUser} />
    </section>
  );
}

export default UpdateUserPage;
