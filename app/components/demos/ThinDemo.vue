<script setup lang="ts">
type View = 'thin' | 'thick'
const options: { id: View, label: string }[] = [
  { id: 'thin', label: 'New or refactored' },
  { id: 'thick', label: 'Legacy, until it is touched' },
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
    <h3>Thick or thin</h3>
    <p class="why">
      New and refactored Laravel controllers are written thin, with logic in services and actions. Older ones stay thick until there is a reason to touch them. DTOs give each request one shape, and a transaction means the operation commits whole or not at all.
    </p>
    <p class="principle">
      Single Responsibility. The Boy Scout Rule. The code here is written for this page.
    </p>
    <ChoiceGroup
      v-model="view"
      :options="options"
      label="Controller style"
    />
    <pre tabindex="0">{{ code[view] }}</pre>
  </div>
</template>
