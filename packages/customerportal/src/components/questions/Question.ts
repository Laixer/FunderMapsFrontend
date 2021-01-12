import { computed, ComputedRef, inject, InjectionKey, onMounted, onUpdated, SetupContext } from "vue";

interface Data {
  [key: string]: unknown;
}

export const isValidKey: InjectionKey<ComputedRef<boolean>> = Symbol();
export const storeDataKey: InjectionKey<() => void> = Symbol();

export default (props: Data, context: SetupContext) => {
  const isValid = inject(
    isValidKey,
    computed(() => false)
  );

  const storeData = inject(storeDataKey, () => {
    return;
  });

  context.emit("isValid", isValid);

  onMounted(() => {
    context.emit("isValid", isValid);
  });

  onUpdated(() => {
    context.emit("isValid", isValid);
    storeData();
  });

  return {
    isValid,
    storeData
  };
};
