import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class Player extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    @input
    cylinderObject : SceneObject

    onAwake() {
        
    this.gestureModule
        .getTargetingDataEvent(GestureModule.HandType.Right)
        .add((targetArgs: TargetingDataArgs) => {
        //   print('Is Valid: ' + targetArgs.isValid);
        //   print('Ray Origin In World: ' + targetArgs.rayOriginInWorld);
        //   print('Ray Direction In World: ' + targetArgs.rayDirectionInWorld);

        let probe = Physics.createGlobalProbe();
        let end = targetArgs.rayOriginInWorld.add(targetArgs.rayDirectionInWorld.uniformScale(100));
        
        probe.rayCast(targetArgs.rayOriginInWorld, end, function (hit){
            if(hit === null){
                return;
            }
            let thing_I_shot = hit.collider.getSceneObject()

            thing_I_shot.destroy()
        })
        });

    
    }

    private drawCylin(start, end){
        // Calculate the direction and length of the ray
        let dir = end.sub(start);
        let length = dir.length();
        let midPoint = start.add(dir.uniformScale(0.5));


        

        // Set the position of the cylinder to the midpoint of the ray
        this.cylinderObject.getTransform().setWorldPosition(midPoint);

        // Rotate the cylinder to align with the ray direction
        let up = new vec3(0, 1, 0);
        let rotation = quat.rotationFromTo(up, dir.normalize());
        this.cylinderObject.getTransform().setWorldRotation(rotation);

        // Scale the cylinder to match the length of the ray
        // Note: The default height of the cylinder mesh is 2 units
        let radius = 0.05; // Adjust the radius as needed
        this.cylinderObject.getTransform().setLocalScale(new vec3(radius, length / 2.0, radius));
    }
}
