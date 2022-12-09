import VTable from "@/components/vtable/index.vue";

export default defineComponent<{ name: string }>((props, context) => {
  const num = ref(0);


  return () => (

    <VTable paging={params => ({
      count: 1200,
      page: 1,
      items: []
    })}></VTable>
  );
});
