"use strict";

var BookItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.remark=obj.remark;
    } else {
        this.key = "";
        this.remark="";
    }
};


BookItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var Book = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new BookItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Book.prototype = {
    init: function () {
    },
    save: function (key,remark) {
        //var from = Blockchain.transaction.from;
        var bookItem = this.repo.get(key);
        if (bookItem) {
            bookItem.key = JSON.parse(bookItem).key;
            bookItem.remark = JSON.parse(bookItem).remark + '|-' + remark;
            this.repo.put(key, bookItem);

        } else {
            bookItem = new BookItem();
            bookItem.key = key;
            bookItem.remark=remark;
            this.repo.put(key, bookItem);
        }
    },
    get: function (key) {
        key = key.trim();
        if (key === "") {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = Book;