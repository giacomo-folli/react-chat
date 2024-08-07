import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { listUsers, listUserChats, addToContacts, resetUnreadCounter } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, listUsers);

router.get("/contacts", protectRoute, listUserChats);

router.get("/resetUnread/:id", protectRoute, resetUnreadCounter)

router.get("/addContact/:id", protectRoute, addToContacts);

export default router;
