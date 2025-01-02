"use client";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, ChangeEvent } from "react";

export default function Interest() {
  const router = useRouter();
  // State to manage interest input and the tags created from the input
  const [interest, setInterest] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Adds interest as a tag when Enter is pressed, if the input is not empty
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interest.trim()) {
      setTags((prevTags) => [...prevTags, interest.trim()]);
      setInterest(""); // Reset input after adding tag
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  // Updates interest state as the user types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };

  // Removes a tag when the 'x' button is clicked
  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  // Save the tags to sessionStorage
  const handleSave = () => {
    // Save tags to sessionStorage
    if (typeof window !== "undefined") {
      // Simpan tags ke sessionStorage
      sessionStorage.setItem("userTags", JSON.stringify(tags));
      router.push("/about");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-sans px-4 bg-radial-custom">
      <main className="w-full max-w-md rounded-lg">
        <h1 className="text-lg font-bold mb-1 ml-4 text-transparent bg-clip-text bg-[linear-gradient(74.08deg,_#94783E_-6.8%,_#F3EDA6_16.76%,_#F8FAE5_30.5%,_#FFE2BE_49.6%,_#D5BE88_78.56%,_#F8FAE5_89.01%,_#D5BE88_100.43%)] hover:underline cursor-pointer">
          Tell everyone about yourself
        </h1>
        <h1 className="text-2xl text-white font-bold mb-6 ml-4">
          What interest you?
        </h1>

        <form className="space-y-4">
          {/* Input field for entering interest */}
          <input
            type="text"
            value={interest}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full p-4 rounded-md bg-[rgba(255,255,255,0.06)] text-white placeholder:text-gray-300 border border-transparent focus:ring-2"
            placeholder="Type your interest and press Enter"
          />

          {/* Display tags created from interest input */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#62CDCB] text-white rounded-full px-4 py-1 text-sm"
              >
                <span>{tag}</span>
                {/* Button to remove a tag */}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-lg cursor-pointer hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {/* Submit button to save the input */}
          <button
            type="button"
            onClick={handleSave} // Trigger save function
            disabled={!tags.length}
            className={`w-full py-2 bg-gradient-to-r from-[#62CDCB] to-[#4599DB] hover:bg-blue-700 rounded-md text-lg font-semibold text-white transition-all duration-300 ${
              !tags.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:shadow-[#4599DB]/50"
            }`}
          >
            Save
          </button>
        </form>
      </main>
    </section>
  );
}
