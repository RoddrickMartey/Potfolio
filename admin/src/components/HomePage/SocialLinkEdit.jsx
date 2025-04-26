import React, { useState } from "react";
import axiosInstance from "../../app/axiosConfig";
import Joi from "joi";
import SocialItem from "./Items/SocialItem";

const schema = Joi.object({
  platform: Joi.string()
    .valid("GitHub", "LinkedIn", "Twitter", "Facebook", "Instagram", "Other")
    .required(),
  url: Joi.string().uri().required(),
});

const SocialLinkEdit = ({ socialLinks, fetchUser }) => {
  const [platform, setPlatform] = useState("GitHub");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate({ platform, url });

    if (error) {
      const field = error.details[0].context.key;
      setErrors({ [field]: error.details[0].message });
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await axiosInstance.post("/addSocial", { platform, url });
      setUrl("");
      setPlatform("GitHub");
      fetchUser();
    } catch (err) {
      setErrors({
        apiError: err?.response?.data?.message || "Failed to add social link.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="p-4 border border-gray-300 rounded-md bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold block mb-1">Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={submitting}
          >
            <option>GitHub</option>
            <option>LinkedIn</option>
            <option>Twitter</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Other</option>
          </select>
          {errors.platform && (
            <p className="text-red-500 text-sm">{errors.platform}</p>
          )}
        </div>

        <div>
          <label className="font-semibold block mb-1">URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={submitting}
          />
          {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
        </div>

        {errors.apiError && (
          <p className="text-red-500 text-sm">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Social Link"}
        </button>
      </form>

      <div className="mt-6">
        {socialLinks.length === 0 ? (
          <p className="text-gray-500">No social links added yet.</p>
        ) : (
          socialLinks.map((link) => (
            <SocialItem key={link.id} link={link} fetchUser={fetchUser} />
          ))
        )}
      </div>
    </section>
  );
};

export default SocialLinkEdit;
