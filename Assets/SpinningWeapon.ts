@component
export class NewScript extends BaseScriptComponent {

    @input
    orb: ObjectPrefab;

    @input
    player: SceneObject;

    @input
    radius: number

    leftOrb: SceneObject;
    rightOrb: SceneObject;

    timeElapsed: number;

    onAwake() {
        this.leftOrb = this.orb.instantiate(this.player);
        this.leftOrb.getTransform().setLocalScale(new vec3(0.5,0.5,0.5));
        this.rightOrb = this.orb.instantiate(this.player);
        this.rightOrb.getTransform().setLocalScale(new vec3(0.5, 0.5, 0.5));
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
    }

    onUpdate() {
        this.timeElapsed += getDeltaTime();
        this.timeElapsed = this.timeElapsed % (Math.PI*2)

        this.leftOrb.getTransform().setLocalPosition(
            new vec3(
                Math.sin(this.timeElapsed)*this.radius,
                0,
                Math.cos(this.timeElapsed)*this.radius,
            )
        );

        this.rightOrb
			.getTransform()
			.setLocalPosition(
				new vec3(
					-Math.sin(this.timeElapsed) * this.radius,
					0,
					-Math.cos(this.timeElapsed) * this.radius
				)
			);
    }
}
