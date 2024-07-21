export default function Page() {
  const utc8TimeNow: string = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Taipei",
    // hour12: false,
    hourCycle: "h23",
  });
  console.log(utc8TimeNow);
  return (
    <div className="p-1">
      <p>TaipeiTime: {utc8TimeNow}</p>
      <input type="text" id="cardNumber" />
      <input type="text" id="cardHolder" />
      <input type="text" id="cardExpirationMonth" />
      <input type="text" id="cardExpirationYear" />
      <input type="text" id="cardCsc" />
    </div>
  );
}
