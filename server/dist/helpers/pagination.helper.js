"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../v1/models/task.model"));
const Pagination = (query, id) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationObject = {
        currentPage: 1,
        limitItems: 8,
    };
    if (query.page) {
        paginationObject.currentPage = query.page;
    }
    paginationObject.skip =
        (paginationObject.currentPage - 1) * paginationObject.limitItems;
    const count = yield task_model_1.default.countDocuments({
        taskParentId: null,
        $or: [{ createdBy: id }, { listUser: id }],
        deleted: false
    });
    paginationObject.totalItems = count;
    return paginationObject;
});
exports.default = Pagination;
