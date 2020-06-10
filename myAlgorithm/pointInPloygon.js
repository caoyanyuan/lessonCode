// 判断点在不在多边形内 所谓的 射线法
function pointInPolygon(point, vs) {
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        let flagY = (yi > y) != (yj > y)
        let flagX = x < (xj - xi) * (y - yi) / (yj - yi) + xi

        var intersect = flagX && flagY
            
        if (intersect) inside = !inside;
    }

    return inside;
}

let flag = pointInPolygon([3,2], [[1,1],[2,3],[4,3],[4,0]])