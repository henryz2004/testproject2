import { HandInteractor } from "SpectaclesInteractionKit/Core/HandInteractor/HandInteractor";
import { SIK } from "SpectaclesInteractionKit/SIK"

@component
export class Player extends BaseScriptComponent {
    private gestureModule: GestureModule = require('LensStudio:GestureModule');

    @input 
    attack_cooldown: number = 1.0;

    @input
    projectile_obj: ObjectPrefab;
    
    @input
    launch_velocity: number;

    attack_timer = this.attack_cooldown;

    onAwake() {
        this.createEvent('UpdateEvent').bind(this.onUpdate.bind(this))

    this.gestureModule
        .getTargetingDataEvent(GestureModule.HandType.Right)
        .add((targetArgs: TargetingDataArgs) => {
        print('Is Valid: ' + targetArgs.isValid);
        print('Ray Origin In World: ' + targetArgs.rayOriginInWorld);
        print('Ray Direction In World: ' + targetArgs.rayDirectionInWorld);
        if(this.attack_timer > 0){
            //print('ON COOLDOWN')
            return
        }
        this.attack_timer = this.attack_cooldown;
        //print('SHOT FIRED')


        let curr_proj = this.projectile_obj.instantiate(this.getSceneObject())
        curr_proj.getTransform().setWorldPosition(targetArgs.rayOriginInWorld)

        let matrix = curr_proj.getTransform().getWorldTransform()

        let rb = curr_proj.getComponent('Physics.BodyComponent');

        rb.velocity = matrix.multiplyPoint(targetArgs.rayDirectionInWorld).normalize().uniformScale(this.launch_velocity)

        print(rb.velocity)
        
        /*
        let probe = Physics.createGlobalProbe();
        probe.debugDrawEnabled = true
        probe.filter.includeStatic = true;
        probe.filter.includeDynamic = false;

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
        */
        });
        
        

    
    }

    onUpdate(){


        this.attack_timer -= getDeltaTime();
        
    }
}
