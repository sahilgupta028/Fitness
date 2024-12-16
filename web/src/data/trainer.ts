interface Trainer {
    id: number;
    name: string;
    specialization: string;
    description: string;
    image: string;
    experience: string;
    certifications: string[];
    contact: {
      email: string;
    };
    testimonials: { client: string; feedback: string }[];
  }

export const trainers: Trainer[] = [
    {
      id: 1,
      name: "John Doe",
      specialization: "Strength & Conditioning Coach",
      description:
        "Helping individuals build strength and achieve their fitness goals with tailored training programs.",
      image: "/trainer/john.jpg",
      experience: "10+ years of experience in strength training and conditioning.",
      certifications: ["Certified Personal Trainer (CPT)", "CSCS"],
      contact: {
        email: "john.doe@example.com",
      },
      testimonials: [
        {
          client: "Alex Turner",
          feedback:
            "John has been instrumental in helping me achieve my fitness goals. Highly recommended!",
        },
        {
          client: "Sarah Lee",
          feedback: "A great coach with an eye for detail and personalized plans.",
        },
      ],
    },
    {
      id: 2,
      name: "Emily Smith",
      specialization: "Yoga & Wellness Expert",
      description:
        "Focusing on flexibility, mindfulness, and holistic health through personalized yoga sessions.",
      image: "/trainer/emily.jpg",
      experience: "7 years of experience teaching yoga and wellness programs.",
      certifications: ["RYT-500", "Certified Meditation Coach"],
      contact: {
        email: "emily.smith@example.com",
      },
      testimonials: [
        {
          client: "Mark Wilson",
          feedback: "Emily's yoga sessions transformed my life. She's a fantastic instructor!",
        },
        {
          client: "Jessica Brown",
          feedback:
            "Her mindfulness techniques have greatly improved my overall well-being.",
        },
      ],
    },
    {
      id: 3,
      name: "Mark Johnson",
      specialization: "Cardio & Endurance Trainer",
      description:
        "Guiding clients to improve cardiovascular health and endurance with high-energy workouts.",
      image: "/trainer/mark.jpg",
      experience: "8 years of experience in cardio training and endurance building.",
      certifications: ["ACE Certified Trainer", "Sports Performance Specialist"],
      contact: {
        email: "mark.johnson@example.com",
      },
      testimonials: [
        {
          client: "Lucy Gray",
          feedback: "Mark's training programs are high-energy and incredibly effective.",
        },
        {
          client: "Peter Blake",
          feedback: "I’ve seen significant improvements in my endurance thanks to Mark.",
        },
      ],
    },
  ];
  