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
exports.statusStatistic = exports.addUser = exports.deleteTask = exports.editTask = exports.createTask = exports.changeStatus = exports.detail = exports.subTaskList = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_helper_1 = __importDefault(require("../../helpers/pagination.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const find = {
        taskParentId: null,
        $or: [
            { createdBy: user._id },
            { listUser: { $elemMatch: { id: user._id } } },
        ],
    };
    if (req.query.status) {
        if (req.query.status === "leader") {
            find["createdBy"] = user._id;
        }
        else if (req.query.status === "member") {
            find["createdBy"] = { $ne: user._id };
        }
        else {
            find["status"] = req.query.status;
        }
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue;
    }
    else {
        sort["createdAt"] = "desc";
    }
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    const paginationObject = yield (0, pagination_helper_1.default)(req.query, user._id);
    const tasks = yield task_model_1.default.find(find)
        .collation({ locale: "en" })
        .sort(sort)
        .skip(paginationObject.skip)
        .limit(paginationObject.limitItems);
    for (let item of tasks) {
        const totalSubTask = yield task_model_1.default.countDocuments({
            deleted: false,
            taskParentId: item._id,
        });
        item.totalSubTask = totalSubTask;
    }
    res.json({
        taskList: tasks,
        totalPage: paginationObject.totalPage,
        totalItems: paginationObject.totalItem,
        limitItem: paginationObject.limitItems,
    });
});
exports.index = index;
const subTaskList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    const listSubTask = yield task_model_1.default.find({
        taskParentId: taskId,
        deleted: false,
    }).sort({ createdAt: "desc" });
    res.json(listSubTask);
});
exports.subTaskList = subTaskList;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const taskDetail = yield task_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    if (req.query.members) {
        res.json({
            code: 200,
            members: taskDetail.listUser,
        });
        return;
    }
    res.json({
        code: 200,
        detail: taskDetail,
    });
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    yield task_model_1.default.updateOne({
        _id: id,
    }, {
        status: status,
    });
    res.json({
        code: 200,
        message: "Cập nhật thành công",
    });
});
exports.changeStatus = changeStatus;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const dataBody = req.body;
        dataBody.createdBy = user._id;
        dataBody.listUser = [
            { id: user._id, fullname: user.fullName, email: user.email },
        ];
        const task = new task_model_1.default(dataBody);
        yield task.save();
        res.json({
            code: 200,
            taskNew: task,
        });
    }
    catch (error) {
        res.json({
            code: 400,
        });
    }
});
exports.createTask = createTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataBody = req.body;
        yield task_model_1.default.updateOne({
            _id: req.params.id,
        }, dataBody);
        res.json({
            code: 200,
        });
    }
    catch (error) {
        res.json({
            code: 400,
        });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_model_1.default.deleteOne({
            _id: req.params.id,
        });
        res.json({
            code: 200,
        });
    }
    catch (error) {
        res.json({
            code: 400,
        });
    }
});
exports.deleteTask = deleteTask;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.email;
        const taskId = req.body.taskId;
        const fullName = req.body.fullname;
        yield task_model_1.default.updateOne({
            _id: taskId,
        }, {
            $push: {
                listUser: { id: req.body._id, fullName: fullName, email: userEmail },
            },
        });
        res.json({
            code: 200,
            message: "Member added successfully!",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Member added failed!",
        });
    }
});
exports.addUser = addUser;
const statusStatistic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const summary = yield task_model_1.default.aggregate([
        {
            $match: {
                $or: [
                    { createdBy: user._id },
                    { listUser: { $elemMatch: { id: user._id } } },
                ],
            },
        },
        {
            $group: {
                _id: "status",
                value: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                value: 1,
            },
        },
    ]);
    res.json(summary);
});
exports.statusStatistic = statusStatistic;
