import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class NewScript extends BaseScriptComponent {

    @input
    objectToCreate: ObjectPrefab;

    // @input
    // rightHandInteractor: HandInteractor;

    // @input
    // leftHandInteractor: HandInteractor;

    private handInputData = SIK.HandInputData;
    private leftHand = this.handInputData.getHand("left");
    private rightHand = this.handInputData.getHand("right");

    onAwake() {
        this.rightHand.onPinchUp(() => {
            this.spawnObject(this.rightHand.indexTip.position);
        });

        this.leftHand.onPinchUp(() => {
            this.spawnObject(this.leftHand.indexTip.position);
        });

    }

    private spawnObject(pos: vec3) {
        const object = this.objectToCreate.instantiate(this.getSceneObject());
        object.getTransform().setWorldPosition(pos)
    }
}