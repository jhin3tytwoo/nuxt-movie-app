import { ref } from "vue";

export const useMovies = () => {
  const movies = ref([
    {
      id: 1,
      title: "รักล้นใจ",
      description: "เรื่องราวความรักสุดซึ้ง",
      image: "/images/movie1.jpg",
      rating: 4.5,
      length: "1 hr 45 min",
      language: "TH", // ใช้ 'TH' หรือ 'EN'
      category: "Drama",
      live: true,
    },
    {
      id: 2,
      title: "ตามหาเธอ",
      description: "หนังโรแมนติก",
      image: "/images/movie2.jpg",
      rating: 4.0,
      length: "2 hr 10 min",
      language: "EN",
      category: "Drama",
      live: false,
    },
    {
      id: 3,
      title: "สายลับลิปกลอส",
      description: "หนังแอคชั่นสายลับ",
      image: "/images/movie3.jpg",
      rating: 4.8,
      length: "1 hr 55 min",
      language: "TH",
      category: "Action",
      live: true,
    },
  ]);

  return { movies };
};
