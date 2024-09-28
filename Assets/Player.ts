import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class Player extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    onAwake() {
        
    this.gestureModule
        .getTargetingDataEvent(GestureModule.HandType.Right)
        .add((targetArgs: TargetingDataArgs) => {
          print('Is Valid: ' + targetArgs.isValid);
          print('Ray Origin In World: ' + targetArgs.rayOriginInWorld);
          print('Ray Direction In World: ' + targetArgs.rayDirectionInWorld);

        let probe = Physics.createGlobalProbe();
        let end = targetArgs.rayOriginInWorld.add(targetArgs.rayDirectionInWorld.uniformScale(10));
        probe.rayCast(targetArgs.rayOriginInWorld, end, function (hit){
            if(hit === null){
                return;
            }
            let thing_I_shot = hit.collider.getSceneObject()

            thing_I_shot.destroy()
        })
        });

    
    }
}
