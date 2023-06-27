import {
    CustomArray
} from "../../common/CustomArray";


export class UCPhotoAttachment {

    constructor() {
        this.id = null;
        this.name = null;
        this.photoType = null;
        this.absolutePath = null;
        this.previewUrl = null;
        this.thumbnailUrl = null;
        this.description = null;
        this.belongType = null;
        this.belongMarkId = null;
        this.format = null;
        this.tag = null;
        this.width = 0;
        this.height = 0;
    }


    static fromJson(jsonObject) {
        let item = null;
        if (!jsonObject) return item;

        item = new UCPhotoAttachment();
        item.id = jsonObject.id;
        item.name = jsonObject.name;
        item.photoType = jsonObject.photoType;
        item.absolutePath = jsonObject.absolutePath;
        item.previewUrl = jsonObject.previewUrl;
        item.thumbnailUrl = jsonObject.thumbnailUrl;
        item.description = jsonObject.description;
        item.belongType = jsonObject.belongType;
        item.belongMarkId = jsonObject.belongMarkId;
        item.tag = jsonObject.tag;
        item.format = jsonObject.format;

        return item;
    }


}

export class UCPhotoAttachments extends CustomArray {
    constructor() {
        super();
    }


    static fromJsons(jsonObjects) {
        let photos = new UCPhotoAttachments();

        if (!jsonObjects) return photos;

        let tempJsonItem = null;
        let tempPhotoItem = null;
        for (let tempIndex = 0; tempIndex < jsonObjects.length; tempIndex++) {
            tempJsonItem = jsonObjects[tempIndex];
            tempPhotoItem = UCPhotoAttachment.fromJson(tempJsonItem);

            if (!tempPhotoItem) continue;

            photos.push(tempPhotoItem);
        }

        return photos;
    }

}