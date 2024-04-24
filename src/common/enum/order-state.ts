enum OrderState {
  IN_USA = "inUsa",
  WAITING_FOR_PAYMENT = "waitingForPayment",
  DELIVERING = "delivering",
  REQUIRE_DOCUMENT = "requireDocument",
  TAX_PAYED = "taxPayed",
  DELIVERED = "delivered",
  SOLD = "sold",
}

export default OrderState;
