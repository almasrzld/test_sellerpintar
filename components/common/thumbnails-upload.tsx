import { useState } from "react";
import { ImagePlus } from "lucide-react";

interface Props {
  onChange: (file: File) => void;
  preview: string | null;
}

const ThumbnailUpload = ({ onChange, preview }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <label
      className={`w-[223px] h-[163px] border-2 border-dashed rounded-[8px] cursor-pointer flex flex-col items-center justify-center text-xs font-normal leading-4 text-slate-500 text-center ${
        hovered ? "bg-gray-100" : ""
      }`}
      onDragEnter={() => setHovered(true)}
      onDragLeave={() => setHovered(false)}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <>
          <ImagePlus className="w-5 h-5 mb-3 text-slate-500" />
          <p className="underline">Click to select files</p>
          <p className="mt-1">Support File Type: jpg or png</p>
        </>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onChange(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </label>
  );
};

export default ThumbnailUpload;
