import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("account", "routes/account.tsx"),
    route("BookDetails/:id", "routes/BookDetails.tsx"),
    route("contact", "routes/contact.tsx"),
    route("login", "routes/login.tsx"),
    route("price-match", "routes/price-match.tsx"),
    route("shop", "routes/shop.tsx"),
    route("signup", "routes/signup.tsx")
    route("cart", "routes/Cart.tsx"),
    route("checkout", "routes/Checkout.tsx"),
    route("orders", "routes/OrderHistory.tsx"),
    route("order-confirmation", "routes/OrderConfirmation.tsx"),
] satisfies RouteConfig;
