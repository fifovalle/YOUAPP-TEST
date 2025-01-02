"use client";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import InputField from "@/components/inputField";
import { calculateAge } from "@/constant/calculateAge";

export default function About() {
  const router = useRouter();
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [aboutData, setAboutData] = useState({
    displayName: "",
    gender: "",
    birthday: "",
    heroScope: "",
    zodiac: "",
    height: "",
    weight: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAboutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditingAbout(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-sans bg-[#09141A] text-white">
      <main className="w-full max-w-lg lg:max-w-2xl rounded-lg p-6">
        {/* Image Section */}
        <div
          className={`mb-6 w-full p-6 rounded-lg ${
            image ? "bg-cover bg-center" : "bg-[rgba(22,35,41,1)]"
          } ${
            aboutData.heroScope && aboutData.zodiac
              ? "h-auto flex-col"
              : "h-56 flex items-end"
          }`}
          style={{ backgroundImage: image ? `url(${image})` : "" }}
        >
          <div className="mb-4">
            <h1 className="text-white text-xl lg:text-3xl font-bold">
              @{aboutData.displayName || "johndoe123"},{" "}
              {calculateAge(aboutData.birthday)}
            </h1>
            <p className="mt-2 text-sm text-gray-300">{aboutData.gender}</p>
          </div>

          {aboutData.heroScope && aboutData.zodiac && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center px-3 py-1 rounded-full bg-[rgba(14,25,31,1)] text-white text-sm">
                {aboutData.heroScope}
              </div>
              <div className="flex items-center px-3 py-1 rounded-full bg-[rgba(14,25,31,1)] text-white text-sm">
                {aboutData.zodiac}
              </div>
            </div>
          )}
        </div>

        {/* About Section */}
        <section className="mb-6 px-6 lg:px-10 py-4 bg-[rgba(14,25,31,1)] rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              About
            </h2>
            {isEditingAbout ? (
              <button
                onClick={handleSave}
                className="text-transparent bg-clip-text bg-[linear-gradient(74.08deg,_#94783E_-6.8%,_#F3EDA6_16.76%,_#F8FAE5_30.5%,_#FFE2BE_49.6%,_#D5BE88_78.56%,_#F8FAE5_89.01%,_#D5BE88_100.43%)] hover:underline cursor-pointer"
              >
                Save & Update
              </button>
            ) : (
              <FaPencil
                className="text-[#B0BEC5] cursor-pointer text-lg"
                onClick={() => setIsEditingAbout(true)}
              />
            )}
          </div>

          {isEditingAbout ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label
                  className={`flex items-center p-4 rounded-2xl cursor-pointer ${
                    image ? "" : "bg-[rgba(255,255,255,0.08)]"
                  }`}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-16 h-16 rounded-2xl"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="cursor-pointer"
                    >
                      <defs>
                        <linearGradient
                          id="gradient1"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" style={{ stopColor: "#94783E" }} />
                          <stop
                            offset="16.76%"
                            style={{ stopColor: "#F3EDA6" }}
                          />
                          <stop
                            offset="30.5%"
                            style={{ stopColor: "#F8FAE5" }}
                          />
                          <stop
                            offset="49.6%"
                            style={{ stopColor: "#FFE2BE" }}
                          />
                          <stop
                            offset="78.56%"
                            style={{ stopColor: "#D5BE88" }}
                          />
                          <stop
                            offset="89.01%"
                            style={{ stopColor: "#F8FAE5" }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#D5BE88" }}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2v20M2 12h20"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-[rgba(255,255,255,1)] text-sm">Add Image</p>
              </div>

              {/* Input Fields */}
              <InputField
                label="Display Name"
                type="text"
                name="displayName"
                value={aboutData.displayName}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <InputField
                label="Gender"
                type="select"
                name="gender"
                value={aboutData.gender}
                onChange={handleInputChange}
                options={["Male", "Female", "Other"]}
                isSelect
              />
              <InputField
                label="Birthday"
                type="text"
                name="birthday"
                value={aboutData.birthday}
                onChange={handleInputChange}
                placeholder="e.g. 01/01/2000"
              />
              <InputField
                label="Hero Scope"
                type="text"
                name="heroScope"
                value={aboutData.heroScope}
                onChange={handleInputChange}
                placeholder="Hero Scope"
              />
              <InputField
                label="Zodiac"
                type="text"
                name="zodiac"
                value={aboutData.zodiac}
                onChange={handleInputChange}
                placeholder="Zodiac"
              />
              <InputField
                label="Height"
                type="text"
                name="height"
                value={aboutData.height}
                onChange={handleInputChange}
                placeholder="Height (cm)"
              />
              <InputField
                label="Weight"
                type="text"
                name="weight"
                value={aboutData.weight}
                onChange={handleInputChange}
                placeholder="Weight (kg)"
              />
            </div>
          ) : (
            <div className="p-6">
              {aboutData.birthday ||
              aboutData.heroScope ||
              aboutData.zodiac ||
              aboutData.height ||
              aboutData.weight ? (
                <>
                  <p className="text-sm text-white lg:text-base mb-3">
                    <span className="text-sm text-[rgba(255,255,255,0.33)]">
                      Birthday:
                    </span>{" "}
                    <span className="text-white">
                      {aboutData.birthday} (Age{" "}
                      {calculateAge(aboutData.birthday)})
                    </span>
                  </p>

                  <p className="text-sm text-white lg:text-base mb-3">
                    <span className="text-sm text-[rgba(255,255,255,0.33)]">
                      Heroscope:
                    </span>{" "}
                    <span className="text-white">{aboutData.heroScope}</span>
                  </p>

                  <p className="text-sm text-white lg:text-base mb-3">
                    <span className="text-sm text-[rgba(255,255,255,0.33)]">
                      Zodiac:
                    </span>{" "}
                    <span className="text-white">{aboutData.zodiac}</span>
                  </p>

                  <p className="text-sm text-white lg:text-base mb-3">
                    <span className="text-sm text-[rgba(255,255,255,0.33)]">
                      Height:
                    </span>{" "}
                    <span className="text-white">{aboutData.height}</span>
                  </p>

                  <p className="text-sm text-white lg:text-base mb-3">
                    <span className="text-sm text-[rgba(255,255,255,0.33)]">
                      Weight:
                    </span>{" "}
                    <span className="text-white">{aboutData.weight}</span>
                  </p>
                </>
              ) : (
                <h1 className="text-sm text-white lg:text-base">
                  Add in your bio to help others know you better
                </h1>
              )}
            </div>
          )}
        </section>

        {/* Interest Section */}
        <section className="mb-6 h-44 lg:h-56 px-6 lg:px-10 py-4 bg-[rgba(14,25,31,1)] rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg lg:text-xl font-semibold text-white">
              Interest
            </h2>
            <FaPencil
              onClick={() => router.push("/interest")}
              className="text-[#B0BEC5] cursor-pointer text-lg"
            />
          </div>
          <div className="p-4">
            {sessionStorage.getItem("userTags") ? (
              <div className="flex flex-wrap gap-2 mb-3">
                {JSON.parse(sessionStorage.getItem("userTags")!).map(
                  (tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[rgba(255,255,255,0.06)] text-white text-sm font-semibold rounded-full hover:bg-[#B0BEC5] cursor-pointer transition duration-200 ease-in-out"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            ) : (
              <h1 className="text-sm text-[rgba(255,255,255,0.52)] lg:text-base">
                Add in your interest to find a better match
              </h1>
            )}
          </div>
        </section>
      </main>
    </section>
  );
}
