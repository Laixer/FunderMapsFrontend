import { computed, ComputedRef, inject, InjectionKey, onMounted, onUpdated, SetupContext } from "vue";

interface Data {
  [key: string]: unknown;
}

export const isValidKey: InjectionKey<ComputedRef<boolean>> = Symbol();
export const storeDataKey: InjectionKey<() => void> = Symbol();

export default (props: Data, { emit }: SetupContext) => {
  const isValid = inject(
    isValidKey,
    computed(() => false)
  );

  const storeData = inject(storeDataKey, () => {
    return;
  });

  emit("isValid", isValid);

  onMounted(() => {
    emit("isValid", isValid);
  });

  onUpdated(() => {
    emit("isValid", isValid);
    storeData();
  });

  return {
    isValid,
    storeData
  };
};
