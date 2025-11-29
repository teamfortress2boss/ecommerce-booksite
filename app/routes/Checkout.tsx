import React, { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/CartContext";
import { supabase } from "~/utils/supabase";

const Checkout: React.FC = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;

    const [first_name, ...rest] = fullName.trim().split(" ");
    const last_name = rest.join(" ");

    const phone_number = formData.get("phone_number") as string;
    const apt_suite_building = formData.get("apt_suite_building") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const country = formData.get("country") as string;
    const zip = formData.get("zip") as string;

  
        const { data: orderRow, error: orderError } = await supabase
      .from("orders")
      .insert({
        first_name,
        last_name,
        phone_number,
        address,
        apt_suite_building,
        city,
        state,
        country,
        zip,
      })
      .select("id")
      .single();

    if (orderError || !orderRow) {
      console.error("Supabase order insert error:", orderError);
      alert("There was a problem saving your order. Please try again.");
      return;
    }

    const orderDbId = orderRow.id; 

  
    if (cartItems.length > 0) {
      const lineItems = cartItems.map((item) => ({
        
        OrderID: orderDbId,        
        product_id: item.id,       
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: lineItemsError } = await supabase
        .from("order_products")
        .insert(lineItems);

      if (lineItemsError) {
        console.error(
          "Supabase order_products insert error:",
          lineItemsError
        );
      }
    }

   
    const now = new Date();
    const orderId =
      "CB-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderNumber = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    const orderDetails = {
      items: cartItems,
      total,
      orderId,
      orderNumber,
      orderDate: now.toLocaleDateString(),
      orderTime: now.toLocaleTimeString(),
      customer: {
        fullName,
        email,
        address,
        phone_number,
        apt_suite_building,
        city,
        state,
        country,
        zip,
      },
    };

    const existingHistory = JSON.parse(
      window.localStorage.getItem("orderHistory") || "[]"
    ) as typeof orderDetails[];
    existingHistory.push(orderDetails);
    window.localStorage.setItem("orderHistory", JSON.stringify(existingHistory));

    clearCart();
    navigate("/order-confirmation", { state: orderDetails });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="address">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="phone_number">
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="apt_suite_building">
            Apt/Suite/Building
          </label>
          <input
            id="apt_suite_building"
            name="apt_suite_building"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            id="city"
            name="city"
            placeholder="City"
            required
            className="border rounded px-3 py-2"
          />
          <input
            id="state"
            name="state"
            placeholder="State"
            required
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            id="country"
            name="country"
            placeholder="Country"
            required
            className="border rounded px-3 py-2"
          />
          <input
            id="zip"
            name="zip"
            placeholder="ZIP Code"
            required
            className="border rounded px-3 py-2"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;

