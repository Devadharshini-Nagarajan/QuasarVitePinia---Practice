import { ref, toValue, watchEffect } from "vue";

export function useFetch(url) {
  const data = ref({});
  const error = ref(null);

  watchEffect(async () => {
    data.value = null;
    error.value = null;
    const urlValue = toValue(url);
    try {
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  });

  return { data, error };
}
