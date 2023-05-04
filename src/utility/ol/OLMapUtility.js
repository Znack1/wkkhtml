export class OLMapUtility
{   
    constructor()
    {

    }

    static getProjectionCode(curMap)
    { 
      let mapView = curMap.getView();
      let projection = mapView.getProjection();
      let projectionCode = projection.getCode();
        
      return projectionCode;
    }


}