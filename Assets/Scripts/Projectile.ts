@component
export class Projectile extends BaseScriptComponent {
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');

    onAwake() {
        this.rb.onCollisionEnter.add((e: CollisionEnterEventArgs) => {

            print("COLLISION HAPPENED")
            let collision: Collision = e.collision;
            let collider: ColliderComponent = e.collision.collider
            if(collider.getSceneObject().name.startsWith("Enemy")){
                collision.collider.getSceneObject().destroy()
                print('destroyed enemy')
                if(this.getSceneObject()){
                    this.getSceneObject().destroy()
                }
                
            }
          });
    }
}
