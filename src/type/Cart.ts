import type typeProduct from "@/type/Product";
export default class Cart {
  uuid!: number;
  content!: Array<typeProduct>;
}
