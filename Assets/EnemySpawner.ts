@component
export class NewScript extends BaseScriptComponent {

    @input enemyPrefab: ObjectPrefab;
    @input spawnParent: SceneObject;
    @input spawnTime: number;

    onAwake() {
        var spawnEvent = this.createEvent("DelayedCallbackEvent")
        spawnEvent.bind(() => {
            this.spawnEnemy();
            spawnEvent.reset(this.spawnTime);
        })
        spawnEvent.reset(this.spawnTime);
    }

    spawnEnemy() {
        var enemyInstance = this.enemyPrefab.instantiate(this.spawnParent);
        enemyInstance.getTransform().setWorldPosition(new vec3(0,0,0));
    }
}
