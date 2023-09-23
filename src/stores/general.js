import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    API_URL: "http://88.126.225.77.3006",
  })
})

export default useGeneralStore;
