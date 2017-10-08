"use strict"

var settings = require("../../config");
let tryReq = 0;

class BaseKinveyData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;

        // let options = settings.kinveyOptions;
        // options.method = "GET";
        // options.url += "appdata/kid_SJw3tuDn-/blogs";

        // if (tryReq <= 0) {
        //     tryReq += 1;
        //     this.db(options, (error, response, body) => {
        //         if (error) throw new Error(error);
              
        //         console.log(body);
        //     });
        // }
    }

    // filterBy(props) {
    //     return this.collection.find(props)
    //         .toArray();
    // }

    // getAll() {
    //     return this.collection.find()
    //         .toArray()
    //         .then((models) => {
    //             if (this.ModelClass.toViewModel) {
    //                 return models.map(
    //                     (model) => this.ModelClass.toViewModel(model)
    //                 );
    //             }

    //             return models;
    //         });
    // }

    // create(model) {
    //     if (!this._isModelValid(model)) {
    //         return Promise.reject("Validation failed!");
    //     }
    //     return this.collection.insert(model)
    //         .then(() => {
    //             return model;
    //         });
    // }

    // findById(id) {
    //     return this.collection.findOne({
    //         _id: new ObjectID(id),
    //     });
    // }

    // findOrCreateBy(props) {
    //     return this.filterBy(props)
    //         .then(([model]) => {
    //             if (!model) {
    //                 model = {};
    //                 return this.collection.insert(model)
    //                     .then(() => {
    //                         return model;
    //                     });
    //             }

    //             return model;
    //         });
    // }

    // updateById(model) {
    //     return this.collection.updateOne({
    //         _id: model._id,
    //     }, model);
    // }
}

module.exports = BaseKinveyData;
