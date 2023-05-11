import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import styles from "./hero.module.css"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Our Passion for Fragrance
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          From our earliest ancestors to our future children, scent has been a
          part of our lives. Too often in modern living we exclude ourselves
          from exotic fragrances and nature&apos;s aromas. Discover the magic
          and envelop yourself in some of the world&apos;s most heavenly scents.
        </p>
        <UnderlineLink href="/store">Discover your Fragrances</UnderlineLink>
      </div>
      <div className={styles["background-container"]}>
        <div className={styles["video-container"]} style={{ height: "100vh" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.banner} src="/media/moon.png" alt="" />
          <video
            className="video"
            autoPlay
            loop
            muted
            style={{
              minHeight: "100vh",
              minWidth: "100%",
              width: "100%",
            }}
          >
            <source
              src="https://joy1.videvo.net/videvo_files/video/free/2020-01/large_watermarked/200116_Lens%20effect_4k_070_preview.mp4"
              type="video/mp4"
            />
            <source src="media/smoke.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hidden small:block h-full">
          <div className={styles["container"]} />
        </div>
      </div>
    </div>
  )
}

export default Hero
