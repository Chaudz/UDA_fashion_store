"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
});
const Category = (0, mongoose_1.model)("categories", categorySchema);
exports.default = Category;
