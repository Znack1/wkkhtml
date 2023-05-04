export class OLSourceUtility {

    static removeFeatures(source, features) {
        if (!source || !features) return;

        let tempExistFeat = null;
        for (let tempIndex = 0; tempIndex < features.length; tempIndex++) {
            tempExistFeat = features[tempIndex];
            source.removeFeature(tempExistFeat);
        }
    }



}