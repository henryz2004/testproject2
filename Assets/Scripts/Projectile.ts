@component
export class Projectile extends BaseScriptComponent {
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');

    onAwake() {
        this.rb.onCollisionEnter.add(function (e) {
            let collision = e.collision;
            let collider = e.collision.collider
            if(collider.getSceneObject().name.startsWith("Enemy")){
                collision.collider.getSceneObject().destroy()
                this.getSceneObject().destroy()
            }
          });
    }
}
