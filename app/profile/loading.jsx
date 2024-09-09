import Image from "next/image";
import assets from "@public/assets/assets";

const Loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src={assets.icons.loader}
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
};

export default Loading;
