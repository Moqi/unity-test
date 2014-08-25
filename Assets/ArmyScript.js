#pragma strict

//var groundPlane:Plane;

private var smooth:int;
private var targetPosition:Vector3;

function Start () {

}

function Update () {
	transform.position = Vector3.Lerp(transform.position, targetPosition, Time.deltaTime * smooth);
}

public function setProperty(smth: int, targetPos: Vector3) {
	smooth = smth;
	targetPosition = targetPos;
}