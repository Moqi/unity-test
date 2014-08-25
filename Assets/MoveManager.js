#pragma strict

public var smooth:int;
private var selectedObj:GameObject;
private var isSelected:boolean;

function Start () {
}

function Update () {
	if(Input.GetMouseButtonDown(0)) {
		// catch click event
		var hitInfo:RaycastHit;
		var hit = Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), hitInfo);
		
		Debug.Log("click event");
		if(hit) {
			// hit some object
			var hitObj = hitInfo.transform.gameObject;
			Debug.Log("hit this obj : " + hitObj.name);
			if(hitObj.tag == "Armys") {
				// select "Army" object
				Debug.Log("select army");
				selectedObj = hitObj;
				isSelected = true;
			} else if(hitObj.tag == "Grounds" && isSelected) {
				// move selected "Army" object
				Debug.Log("select ground and move");
				var hitPlane = new Plane(Vector3.up, selectedObj.transform.position);
				var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
				var hitdist = 0.0;
				
				if (hitPlane.Raycast(ray, hitdist)) {
					var targetPoint = ray.GetPoint(hitdist);
					selectedObj.GetComponent(ArmyScript).setProperty(smooth, ray.GetPoint(hitdist));
					var targetRotation = Quaternion.LookRotation(targetPoint - selectedObj.transform.position);
					selectedObj.transform.rotation = targetRotation;
				}
			} else {
				// unselect "Army" Object
				Debug.Log("select else");
				isSelected = false;
			}
		} else {
			// if not hit, then unselect "Army" Object
			isSelected = false;
		}
	}
}