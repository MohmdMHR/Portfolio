<script setup lang="ts">
type View = 'thin' | 'thick'
const m = useMessages()
const options: { id: View, label: string }[] = [
  { id: 'thin', label: m.demos.thin.thin },
  { id: 'thick', label: m.demos.thin.thick },
]
const view = ref<View>('thin')

const code: Record<View, string> = {
  thick: `class OrderController
{
    public function store(Request $request)
    {
        $data = $request->all();
        if ($data['total'] <= 0) { abort(422); }

        $order = Order::create($data);
        Payment::charge($order);
        Mail::to($order->email)->send(new Receipt($order));

        return $order;
    }
}`,
  thin: `class OrderController
{
    public function store(StoreOrderRequest $request, PlaceOrder $placeOrder)
    {
        return $placeOrder(OrderData::from($request));
    }
}

class PlaceOrder
{
    public function __invoke(OrderData $data): Order
    {
        return DB::transaction(function () use ($data) {
            $order = Order::create($data->toArray());
            $this->payments->charge($order);

            return $order;
        });
    }
}`,
}
</script>

<template>
  <div>
    <h3>{{ m.demos.thin.heading }}</h3>
    <p class="why">
      {{ m.demos.thin.why }}
    </p>
    <p class="principle">
      {{ m.demos.thin.principle }}
    </p>
    <ChoiceGroup
      v-model="view"
      :options="options"
      :label="m.demos.thin.label"
    />
    <pre tabindex="0">{{ code[view] }}</pre>
  </div>
</template>
