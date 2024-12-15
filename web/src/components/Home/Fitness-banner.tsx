"use client";
import Image from "next/image";

export default function FitnessBanner() {
  return (
    <section className="relative py-2 w-full h-[500px] md:h-[600px]">
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fitness-banner.jpg" // Replace with your image path
          alt="Fitness Banner"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 flex-wrap">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center flex flex-wrap">
          Get in the Best Shape of Your Life
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 text-center max-w-lg flex flex-wrap">
          Join us today for personalized workout plans, nutrition tips, and a supportive fitness community.
        </p>
      </div>
    </section>
  );
}
