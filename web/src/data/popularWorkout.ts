interface Workout {
    id: number;
    title: string;
    description: string;
    image: string;
    details: string;
    benefits: string[];
    duration: string;
    equipment: string;
  }

export const workouts: Workout[] = [
    {
      id: 1,
      title: "HIIT (High-Intensity Interval Training)",
      description:
        "Burn calories faster with short, intense bursts of exercise followed by recovery periods.",
      image: "/workout/hiit.jpg",
      details: `
        High-Intensity Interval Training (HIIT) is a cardiovascular exercise strategy alternating short periods of intense anaerobic exercise with less-intense recovery periods. It's an effective way to burn fat quickly and improve cardiovascular health.
      `,
      benefits: [
        "Rapid fat loss",
        "Improved metabolism",
        "Increased cardiovascular endurance",
        "Boosted stamina",
      ],
      duration: "20-30 minutes",
      equipment: "None or light dumbbells, kettlebells, resistance bands",
    },
    {
      id: 2,
      title: "Yoga & Flexibility",
      description:
        "Improve your balance and flexibility with our guided yoga sessions designed for all levels.",
      image: "/workout/yoga.jpg",
      details: `
        Yoga is a mind-body practice that combines physical postures, breathing exercises, and meditation. It helps improve flexibility, balance, and mental clarity, and it's ideal for reducing stress and promoting relaxation.
      `,
      benefits: [
        "Increased flexibility",
        "Enhanced balance and stability",
        "Stress relief and improved mental clarity",
        "Improved posture",
      ],
      duration: "45-60 minutes",
      equipment: "Yoga mat, blocks, straps (optional)",
    },
    {
      id: 3,
      title: "Strength Training",
      description:
        "Build muscle and boost your metabolism with targeted strength training workouts.",
      image: "/workout/strength.jpg",
      details: `
        Strength training involves using resistance to induce muscular contraction, which builds strength and muscle size. It can be done with free weights, resistance machines, or bodyweight exercises.
      `,
      benefits: [
        "Muscle building",
        "Increased bone density",
        "Boosted metabolism",
        "Enhanced stamina",
      ],
      duration: "45-60 minutes",
      equipment: "Dumbbells, barbells, resistance bands, machines",
    },
    {
      id: 4,
      title: "Pilates",
      description:
        "Focus on core strength, posture, and alignment with low-impact Pilates exercises.",
      image: "/workout/pilates.jpg",
      details: `
        Pilates is a low-impact exercise method that emphasizes body alignment, flexibility, and strength, particularly in the core. It involves precise movements and techniques to improve overall body function.
      `,
      benefits: [
        "Strengthened core muscles",
        "Improved posture and alignment",
        "Enhanced balance and coordination",
        "Increased flexibility",
      ],
      duration: "30-45 minutes",
      equipment: "Mat, Pilates ball, resistance bands (optional)",
    },
    {
      id: 5,
      title: "Cardio Workouts",
      description:
        "Elevate your heart rate and improve endurance with our effective cardio exercises.",
      image: "/workout/cardio.jpg",
      details: `
        Cardio exercises involve activities that increase your heart rate and improve the efficiency of your cardiovascular system. These exercises help in burning calories, improving endurance, and strengthening the heart.
      `,
      benefits: [
        "Improved cardiovascular health",
        "Enhanced stamina",
        "Weight loss",
        "Reduced stress and anxiety",
      ],
      duration: "30-60 minutes",
      equipment: "Treadmill, jump rope, elliptical, stationary bike",
    },
    {
      id: 6,
      title: "CrossFit",
      description:
        "Challenge yourself with high-intensity functional movements for maximum performance.",
      image: "/workout/crossfit.jpg",
      details: `
        CrossFit is a branded fitness program created by Greg Glassman that combines elements of high-intensity interval training (HIIT), Olympic weightlifting, plyometrics, powerlifting, gymnastics, and other exercises to create varied and intense workouts.
      `,
      benefits: [
        "Builds full-body strength",
        "Improves endurance and cardiovascular health",
        "Enhances functional fitness for everyday activities",
        "Increases muscle mass and metabolism",
      ],
      duration: "40-60 minutes",
      equipment: "Barbells, kettlebells, resistance bands, medicine balls",
    },
  ];