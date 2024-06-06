export default function Cart() {
  let cart: Array<any> = [];
  cart = JSON.parse(localStorage.getItem("Cart") as string);
  return (
    <>
      {cart.map((ele, index) => {
        return (
          <div key={ele.id}>
            <p>{ele.name}</p>
            <p>{ele.price}</p>
            <p>{ele.number}</p>
            <button>+</button>
            <button>-</button>
            <button>x</button>
          </div>
        );
      })}
      <p>total: </p>
    </>
  );
}
