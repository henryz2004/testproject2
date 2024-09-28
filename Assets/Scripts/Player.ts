import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class Player extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    @input 
    attack_cooldown: number = 2.0;
    attack_timer = this.attack_cooldown;
    onAwake() {
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))

    this.gestureModule
        .getTargetingDataEvent(GestureModule.HandType.Right)
        .add((targetArgs: TargetingDataArgs) => {
        //   print('Is Valid: ' + targetArgs.isValid);
        //   print('Ray Origin In World: ' + targetArgs.rayOriginInWorld);
        //   print('Ray Direction In World: ' + targetArgs.rayDirectionInWorld);
        if(this.attack_timer > 0){
            print('ON COOLDOWN')
            return
        }
        this.attack_timer = this.attack_cooldown;
        print('SHOT FIRED')
        let probe = Physics.createGlobalProbe();
        probe.debugDrawEnabled = true
        probe.filter.includeStatic = true;
        probe.filter.includeDynamic = false;
        probe.filter.includeIntangible = true;

        let end = targetArgs.rayOriginInWorld.add(targetArgs.rayDirectionInWorld.uniformScale(100));
        
        probe.rayCast(targetArgs.rayOriginInWorld, end, function (hit){
            if(hit === null){
                print('SHOT MISSED')
                return;
            }
            print('SHOT HIT')
            let thing_I_shot = hit.collider.getSceneObject()

            thing_I_shot.destroy()
        })
        });

    
    }

    onUpdate(){


        this.attack_timer -= getDeltaTime();
        
    }
}
