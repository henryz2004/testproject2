import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK";

@component
export class ClickSpawner extends BaseScriptComponent {
    
    @input
    cubePrefab: ObjectPrefab;

    @input
    leftHandInteractor: HandInteractor;

    @input
    rightHandInteractor: HandInteractor;


    private handInputData = SIK.HandInputData;

    private leftHand = this.handInputData.getHand('left')

    private rightHand = this.handInputData.getHand('right')

    private spawnedObjects: SceneObject[] = []
    
    onAwake() {
        this.leftHand.onPinchUp(() => {
            if(this.leftHandInteractor.targetHitInfo === null){
                this.spawnObject(this.leftHand.indexTip.position)
            }
        })

        this.rightHand.onPinchUp(() => {
            if(this.rightHandInteractor.targetHitInfo === null){
                this.spawnObject(this.rightHand.indexTip.position)
            }
        })
    }

    private spawnObject(pos: vec3) : void{
        const spawnedObject = this.cubePrefab.instantiate(this.getSceneObject())
        spawnedObject.getTransform().setWorldPosition(pos)
        this.spawnedObjects.push(spawnedObject)
    }

}