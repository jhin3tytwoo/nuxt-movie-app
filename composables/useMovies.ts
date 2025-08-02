import { ref } from "vue";

export const useMovies = () => {
  const movies = ref([
    {
      id: 1,
      title: "INTERSTELLAR",
      description: "เรื่องราวความรักสุดซึ้ง",
      image:
        "https://i.pinimg.com/736x/0f/ac/1e/0fac1ebec1a28f4c2bc4357d280e280d.jpg",
      rating: 4.5,
      length: "1 hr 45 min",
      language: "TH",
      category: "Drama",
      live: true,
    },
    {
      id: 2,
      title: "AFTER",
      description: "หนังโรแมนติก",
      image:
        "https://i.pinimg.com/736x/5f/f8/c6/5ff8c67b4ee252b5869712f543c779bf.jpg",
      rating: 4.0,
      length: "2 hr 10 min",
      language: "EN",
      category: "Drama",
      live: false,
    },
    {
      id: 3,
      title: "Wendy",
      description: "หนังแฟนตาซี",
      image:
        "https://i.pinimg.com/736x/aa/4f/6b/aa4f6b8177e5579f9cde1d0e97f11589.jpg",
      rating: 4.8,
      length: "1 hr 55 min",
      language: "TH",
      category: "Action",
      live: true,
    },
    {
      id: 4,
      title: "JOKER",
      description: "หนังอาชญากรรม จิตวิทยา",
      image:
        "https://i.pinimg.com/736x/90/f5/d5/90f5d56f37132d30e28385470990aa88.jpg",
      rating: 4.8,
      length: "1 hr 55 min",
      language: "TH",
      category: "Action",
      live: true,
    },
    {
      id: 5,
      title: "WONDER WOMAN",
      description: "หนังซุปเปอร์ฮีโร่",
      image:
        "https://i.pinimg.com/736x/0e/20/8d/0e208dd816c05692e9b5dc15ac198c0f.jpg",
      rating: 4.8,
      length: "1 hr 55 min",
      language: "TH",
      category: "Action",
      live: true,
    },
    {
      id: 6,
      title: "Batman",
      description: "หนังซุปเปอร์ฮีโร่",
      image:
        "https://i.pinimg.com/1200x/01/bb/f2/01bbf20d30bd1a34bb9ed45f962b5e3e.jpg",
      rating: 4.8,
      length: "1 hr 55 min",
      language: "TH",
      category: "Action",
      live: true,
    },
  ]);

  return { movies };
};
