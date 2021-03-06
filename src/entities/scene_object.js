import graphon from '../graphics/graphon';

export default class SceneObject {

    constructor(sceneObject) {
        this._sceneObject = sceneObject;
    }

    get sceneObject() {
        return this._sceneObject
    }

    get onSceneUpdate() {
        return function () {
            // implementation in subclasses is optional
        }
    }

    destroy() {
        graphon.remove(this._sceneObject)
    }
}
