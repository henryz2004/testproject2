@component
export class NewScript extends BaseScriptComponent {

    @input enemyPrefab: ObjectPrefab;
    @input spawnParent: SceneObject;
    @input spawnTime: number;

    onAwake() {
        let store = global.persistentStorageSystem.store;
		let scoreKey = "totalScore";
        var spawnEvent = this.createEvent("DelayedCallbackEvent")
        spawnEvent.bind(() => {
            this.spawnEnemy();
    
    		let currentScore = store.getInt(scoreKey);
            currentScore += 1;
			store.putInt(scoreKey, currentScore);
		
        })
        spawnEvent.reset(this.spawnTime);
    }

    spawnEnemy() {
        var enemyInstance = this.enemyPrefab.instantiate(this.spawnParent);
        enemyInstance.getTransform().setWorldPosition(new vec3(0,0,-30));
    }
}
