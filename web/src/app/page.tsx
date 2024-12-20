import Banner from "@/components/Home/Banner";
import Community from "@/components/Home/Community";
import FAQComponent from "@/components/Home/Faq";
import FeatureSection from "@/components/Home/Feature";
import FeaturedTrainer from "@/components/Home/FeaturedTrainer";
import FitnessBanner from "@/components/Home/Fitness-banner";
import FitnessTips from "@/components/Home/FitnessTips";
import PricingSection from "@/components/Home/Plans";
import PopularWorkouts from "@/components/Home/PopularWorkout";
import TestimonialSection from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <div >
      <FitnessBanner />
      <Banner />
      <FeatureSection />
      <TestimonialSection />
      <PricingSection />
      <FeaturedTrainer />
      <PopularWorkouts />
      <Community />
      <FitnessTips />
      <FAQComponent />
    </div>
  );
}
