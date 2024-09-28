@component
export class Projectile extends BaseScriptComponent {
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');



    private isEnemy(collider): boolean {
        // Assuming enemies have a specific name or tag
        return collider.getSceneObject().name.startsWith("Enemy");
    }

    onAwake() {
        this.rb.onCollisionEnter.add(function (e) {
            let collision = e.collision;
            
            if(this.isEnemy(collision.collider)){
                collision.collider.getSceneObject().destroy()
                this.getSceneObject().destroy()
            }
          });
    }
}
