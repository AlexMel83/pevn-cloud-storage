import { defineStore } from "pinia";
import { onMounted, ref, computed } from "vue";

// export const useMovieStore = defineStore("movieStore", {
//   state: () => ({
//     movies: [],
//     activeTab: 2,
//   }),
//   getters: {
//     watchedMovies() {
//       return this.movies.filter((el) => el.isWatched);
//     },
//   },
//   actions: {
//     setActiveTab(id) {
//       this.activeTab = id;
//     },
//     toggleWatched(id) {
//       const idx = this.movies.findIndex((el) => el.id === id);
//       this.movies[idx].isWatched = !this.movies[idx].isWatched;
//     },
//     deleteMovie(id) {
//       this.movies = this.movies.filter((el) => el.id !== id);
//     },
//   },
// });

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const activeTab = ref(2);

  onMounted(() => {
    const moviesInLocalStorage = localStorage.getItem("movies");
    if (moviesInLocalStorage) {
      movies.value = JSON.parse(moviesInLocalStorage)._value;
    }
    watch(()=>movies, (state)=>{
      localStorage.setItem('movies', JSON.stringify(state));
    }, {deep: true})
  });

  const setActiveTab = (id) => {
    activeTab.value = id;
  };
  const toggleWatched = (id) => {
    const idx = movies.value.findIndex((el) => el.id === id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  };
  const deleteMovie = (id) =>
    (movies.value = movies.value.filter((el) => el.id !== id));

  const watchedMovies = computed(() => {
    return movies.value.filter((el) => el.isWatched);
  });

  const totalCountMovies = computed(() => {
    return movies.value.length;
  });

  return {
    movies,
    activeTab,
    setActiveTab,
    toggleWatched,
    deleteMovie,
    watchedMovies,
    totalCountMovies,
  };
});
