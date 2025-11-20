import Image from "next/image";

const ImageBlock = ({ src, alt, caption, width = 800, height = 600 }) => {
  return (
    <figure>
      <Image src={src} alt={alt} width={width} height={height} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default ImageBlock;
