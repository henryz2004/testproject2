import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK";

@component
export class PinchToSpawn extends BaseScriptComponent {
    @input
    objectToSpawn: ObjectPrefab;

    @input
    leftHandInteractor: HandInteractor;

    @input
    rightHandInteractor: HandInteractor;

    private handInputData = SIK.HandInputData;
    private leftHand = this.handInputData.getHand("left");
    private rightHand = this.handInputData.getHand("right");
    private spawnedObjects: SceneObject [] = [];

    onAwake() {
        this.leftHand.onPinchUp(()=> {
            if (this.leftHandInteractor.targetHitInfo === null) {
                this.spawnObject(this.leftHand.indexTip.position);
            }
        });

        this.rightHand.onPinchUp(()=> {
            if (this.rightHandInteractor.targetHitInfo === null) {
                this.spawnObject(this.leftHand.indexTip.position);
            }
        });
    }

    private spawnObject(position: vec3): void {
        const spawnedObject = this.objectToSpawn.instantiate(this.getSceneObject());
            spawnedObject.getTransform().setWorldPosition(position);
            this.spawnedObjects.push(spawnedObject);
    }
}
