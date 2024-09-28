@component
export class NewScript extends BaseScriptComponent {
	private scoreText = this.getSceneObject().getComponent("Component.Text");
    private store = global.persistentStorageSystem.store;
	private scoreKey = "totalScore";
	onAwake() {
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
	}

	onUpdate() {  
        let currentScore = this.store.getInt(this.scoreKey);
        this.scoreText.text = "Score " + currentScore; 
    }
}
