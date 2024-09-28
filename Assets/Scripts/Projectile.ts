@component
export class Projectile extends BaseScriptComponent {
    rb = this.getSceneObject().getComponent('Physics.BodyComponent');

    onAwake() {
        let store = global.persistentStorageSystem.store;
		let scoreKey = "totalScore";

        this.rb.onCollisionEnter.add((e: CollisionEnterEventArgs) => {

            print("COLLISION HAPPENED")
            let collision: Collision = e.collision;
            let collider: ColliderComponent = e.collision.collider
            if(collider.getSceneObject().name.startsWith("Enemy")){
                collision.collider.getSceneObject().destroy()
                print('destroyed enemy')
                this.enabled = false;

                let currentScore = store.getInt(scoreKey);
				currentScore += 1;
				store.putInt(scoreKey, currentScore);
                
            }
          });
    }
}
