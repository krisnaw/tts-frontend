import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/logout", "routes/logout.tsx"),
    route("/register", "routes/register.tsx"),


    route("/record/create", "routes/create-record.tsx"),
    route("/record/:recordId/delete", "routes/delete-record.tsx")
] satisfies RouteConfig;
