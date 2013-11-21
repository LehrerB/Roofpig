#= require roofpig/v3_utils

class @Camera

  constructor: (hover) ->
    coord = 25
    @cam = new THREE.PerspectiveCamera(this._view_angle(hover, coord), 1, 1, 100)

    @cam.position.set(coord, coord, coord)
    @cam.up.set(0,0,1);
    this._cam_moved()

    #Directions, as seen by the user
    @user_dir =
       x: v3(1, 0, 0)
       y: v3(0, 1, 0)
       z: v3(0, 0, 1)

  rotate: (axis, angle) ->
    for v in [@cam.position, @cam.up, @user_dir.x, @user_dir.y, @user_dir.z]
      v.applyAxisAngle(axis, angle)
    this._cam_moved()

  bend: (dx, dy) ->
    @cam.position = @cam_position.clone()
    @cam.up = @cam_up.clone()
    for v in [@cam.position, @cam.up]
      v.applyAxisAngle(@user_dir.z, dx)
      v.applyAxisAngle(v3_sub(@user_dir.y, @user_dir.x).normalize(), dy)
    @cam.lookAt(v3(0, 0, 0))

  _view_angle: (hover, cam_pos) ->
    max_cube_size = 2 * Math.sqrt(hover*hover + 4*hover + 13)
    dist = Math.sqrt(3*cam_pos*cam_pos) - 2
    2 * Math.atan(max_cube_size / (2 * dist)) * (180 / Math.PI)

  _cam_moved: ->
    @cam.lookAt(v3(0, 0, 0))
    @cam_up = @cam.up.clone()
    @cam_position = @cam.position.clone()