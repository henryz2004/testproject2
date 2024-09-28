@component
export class EnemyChase extends BaseScriptComponent {
    @input
    speed : number;

    @input
    userObj: SceneObject

    enemy = this.getSceneObject()

    onAwake() {

    }

    onUpdate(){
        this.move()
    }

    private move(): void{
        let userPos: vec3 = this.userObj.getTransform().getWorldPosition()

        let currPos: vec3 = this.enemy.getTransform().getWorldPosition()

        let move_vec: vec3 = userPos.sub(currPos)

        move_vec = move_vec.normalize()

        let newPos = currPos.add(move_vec.uniformScale(this.speed * getDeltaTime()))

        this.enemy.getTransform().setWorldPosition(newPos)

    }
}
