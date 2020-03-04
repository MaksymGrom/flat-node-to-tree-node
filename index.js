"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var flatNodeList = [
    {
        id: 55,
        level: 1,
        name: 'Программирование'
    },
    {
        id: 1,
        parentId: 55,
        name: 'Git уроки',
        level: 2
    },
    {
        id: 3,
        parentId: 1,
        name: 'Git установка',
        level: 3
    },
    {
        id: 5,
        parentId: 1,
        name: 'Git Первый коммит',
        level: 3
    },
    {
        id: 6,
        parentId: 1,
        name: 'Github',
        level: 3
    },
    {
        id: 404,
        name: 'Жизнь',
        level: 1
    },
    {
        id: 500,
        parentId: 404,
        name: 'Когда нужно доверить задачу другому разрабу',
        level: 2
    },
    {
        id: 7,
        parentId: 55,
        name: 'Angular NGRX',
        level: 2
    },
    {
        id: 8,
        parentId: 7,
        name: 'Angular ngrx store',
        level: 3
    },
    {
        id: 9,
        parentId: 7,
        name: 'Angular ngrx router',
        level: 3
    },
    {
        id: 10,
        parentId: 7,
        name: 'Angular ngrx actions',
        level: 3
    }
];
var TreeCollection = /** @class */ (function () {
    function TreeCollection() {
        this.map = {};
        this.collection = [];
    }
    TreeCollection.prototype.add = function (treeNode) {
        this.map[treeNode.id] = treeNode;
        if (treeNode.level === 1) {
            this.collection.push(treeNode);
            return this;
        }
        if (treeNode.parentId && this.map[treeNode.parentId]) {
            this.map[treeNode.parentId].children.push(treeNode);
        }
        return this;
    };
    TreeCollection.prototype.remove = function (id) {
        var treeNode = this.map[id];
        if (treeNode === undefined) {
            return;
        }
        if (treeNode.level === 1) {
            this.collection = this.collection.filter(function (node) { return node.id !== id; });
            return;
        }
        if (!treeNode.parentId) {
            return;
        }
        var parentNode = this.map[treeNode.parentId];
        parentNode.children = parentNode.children.filter(function (node) { return node.id !== id; });
    };
    TreeCollection.prototype.getAll = function () {
        return this.collection;
    };
    return TreeCollection;
}());
var treeCollection = flatNodeList.map(function (flatNode) { return (__assign(__assign({}, flatNode), { children: [] })); }).sort(function (a, b) { return a.level > b.level ? 1 : -1; })
    .reduce(function (treeCollection, item) { return treeCollection.add(item); }, new TreeCollection());
var foo = new TreeCollection();
treeCollection.remove(55);
console.log(treeCollection.getAll());
