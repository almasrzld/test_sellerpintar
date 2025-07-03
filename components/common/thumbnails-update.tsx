import Image from "next/image";
import { useRef } from "react";

interface Props {
  onChange: (file: File | null) => void;
  preview: string | null;
}

const ThumbnailUpdate = ({ onChange, preview }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      e.target.value = "";
    }
  };

  return (
    <div className="w-[223px] border border-slate-200 rounded-lg overflow-hidden">
      <div className="w-[199px] h-[115px] mx-auto mt-3 rounded-[6px] bg-slate-100 flex items-center justify-center">
        {preview ? (
          <Image
            src={preview}
            alt="Thumbnail Preview"
            width={199}
            height={115}
            className="w-full h-full object-cover rounded-[6px]"
            unoptimized
          />
        ) : (
          <span className="text-sm text-slate-500">No image selected</span>
        )}
      </div>

      <div className="flex justify-center gap-4 pt-2 pb-3 text-sm font-medium">
        <button
          type="button"
          className="text-blue-600 underline hover:text-blue-600/80 cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          Changes
        </button>
        <button
          type="button"
          className="text-red-500 underline hover:text-red-500/80 cursor-pointer"
          onClick={() => onChange(null)}
        >
          Delete
        </button>
      </div>

      <input
        type="file"
        ref={inputRef}
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ThumbnailUpdate;
