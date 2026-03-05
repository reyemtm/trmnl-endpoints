// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/fsum.js
var Adder = class {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j], hi = x + y, lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
};

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/merge.js
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}
function merge(arrays) {
  return Array.from(flatten(arrays));
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/math.js
var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;
var degrees = 180 / pi;
var radians = pi / 180;
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var sin = Math.sin;
var sign = Math.sign || function(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/noop.js
function noop() {
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/stream.js
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}
var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};
function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}
function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}
function stream_default(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/cartesian.js
function spherical(cartesian2) {
  return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
}
function cartesian(spherical2) {
  var lambda = spherical2[0], phi = spherical2[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}
function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}
function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/compose.js
function compose_default(a, b) {
  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }
  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };
  return compose;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi) {
  if (abs(lambda) > pi) lambda -= Math.round(lambda / tau) * tau;
  return [lambda, phi];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    lambda += deltaLambda;
    if (abs(lambda) > pi) lambda -= Math.round(lambda / tau) * tau;
    return [lambda, phi];
  };
}
function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
  function rotation(lambda, phi) {
    var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }
  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi), x = cos(lambda) * cosPhi, y = sin(lambda) * cosPhi, z = sin(phi), k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };
  return rotation;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/circle.js
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/buffer.js
function buffer_default() {
  var lines = [], line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null;
}
function rejoin_default(segments, compareIntersection2, startInside, interpolate, stream) {
  var subject = [], clip = [], i, n;
  segments.forEach(function(segment) {
    if ((n2 = segment.length - 1) <= 0) return;
    var n2, p0 = segment[0], p1 = segment[n2], x;
    if (pointEqual_default(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n2; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      p1[0] += 2 * epsilon;
    }
    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });
  if (!subject.length) return;
  clip.sort(compareIntersection2);
  link(subject);
  link(clip);
  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }
  var start = subject[0], points, point;
  while (1) {
    var current = start, isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}
function link(array) {
  if (!(n = array.length)) return;
  var n, i = 0, a = array[0], b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/polygonContains.js
function longitude(point) {
  return abs(point[0]) <= pi ? point[0] : sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}
function polygonContains_default(polygon, point) {
  var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle = 0, winding = 0;
  var sum = new Adder();
  if (sinPhi === 1) phi = halfPi + epsilon;
  else if (sinPhi === -1) phi = -halfPi - epsilon;
  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring, m, point0 = ring[m - 1], lambda0 = longitude(point0), phi0 = point0[1] / 2 + quarterPi, sinPhi0 = sin(phi0), cosPhi0 = cos(phi0);
    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j], lambda1 = longitude(point1), phi1 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi1), cosPhi1 = cos(phi1), delta = lambda1 - lambda0, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi, k = sinPhi0 * sinPhi1;
      sum.add(atan2(k * sign2 * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign2 * tau : delta;
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }
  return (angle < -epsilon || angle < epsilon && sum < -epsilon2) ^ winding & 1;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink), ringBuffer = buffer_default(), ringSink = clipLine(ringBuffer), polygonStarted = false, polygon, segments, ring;
    var clip = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains_default(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          rejoin_default(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };
    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }
    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }
    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }
    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }
    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }
    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point2;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return;
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point2 = segment[i])[0], point2[1]);
          sink.lineEnd();
        }
        return;
      }
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }
    return clip;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(
  function() {
    return true;
  },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);
function clipAntimeridianLine(stream) {
  var lambda0 = NaN, phi0 = NaN, sign0 = NaN, clean;
  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi, delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) {
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) {
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon;
        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean;
    }
  };
}
function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0, cosPhi1, sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1) - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/circle.js
function circle_default(radius) {
  var cr = cos(radius), delta = 2 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon;
  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }
  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }
  function clipLine(stream) {
    var point0, c0, v0, v00, clean;
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi], point2, v = visible(lambda, phi), c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual_default(point0, point2) || pointEqual_default(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual_default(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | (v00 && v0) << 1;
      }
    };
  }
  function intersect(a, b, two) {
    var pa = cartesian(a), pb = cartesian(b);
    var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A = cartesianScale(n1, c1), B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);
    var u = n1xn2, w = cartesianDot(A, u), uu = cartesianDot(u, u), t2 = w * w - uu * (cartesianDot(A, A) - 1);
    if (t2 < 0) return;
    var t = sqrt(t2), q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);
    if (!two) return q;
    var lambda0 = a[0], lambda1 = b[0], phi0 = a[1], phi1 = b[1], z;
    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;
    var delta2 = lambda1 - lambda0, polar = abs(delta2 - pi) < epsilon, meridian = polar || delta2 < epsilon;
    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;
    if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta2 > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius, code2 = 0;
    if (lambda < -r) code2 |= 1;
    else if (lambda > r) code2 |= 2;
    if (phi < -r) code2 |= 4;
    else if (phi > r) code2 |= 8;
    return code2;
  }
  return clip_default(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/line.js
function line_default(a, b, x05, y05, x12, y12) {
  var ax = a[0], ay = a[1], bx = b[0], by = b[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
  r = x05 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }
  r = x12 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }
  r = y05 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }
  r = y12 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }
  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9;
var clipMin = -clipMax;
function clipRectangle(x05, y05, x12, y12) {
  function visible(x, y) {
    return x05 <= x && x <= x12 && y05 <= y && y <= y12;
  }
  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do
        stream.point(a === 0 || a === 3 ? x05 : x12, a > 1 ? y12 : y05);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }
  function corner(p, direction) {
    return abs(p[0] - x05) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x12) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y05) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
  }
  function compareIntersection2(a, b) {
    return comparePoint(a.x, b.x);
  }
  function comparePoint(a, b) {
    var ca = corner(a, 1), cb = corner(b, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
  }
  return function(stream) {
    var activeStream = stream, bufferStream = buffer_default(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
    var clipStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart,
      polygonEnd
    };
    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }
    function polygonInside() {
      var winding = 0;
      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring2 = polygon[i], j = 1, m = ring2.length, point2 = ring2[0], a0, a1, b0 = point2[0], b1 = point2[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point2 = ring2[j], b0 = point2[0], b1 = point2[1];
          if (a1 <= y12) {
            if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x05 - a0)) ++winding;
          } else {
            if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x05 - a0)) --winding;
          }
        }
      }
      return winding;
    }
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }
    function polygonEnd() {
      var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = merge(segments)).length;
      if (cleanInside || visible2) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible2) {
          rejoin_default(segments, compareIntersection2, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }
    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }
    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (line_default(a, b, x05, y05, x12, y12)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }
    return clipStream;
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/identity.js
var identity_default = (x) => x;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/area.js
var areaSum = new Adder();
var areaRingSum = new Adder();
var x00;
var y00;
var x0;
var y0;
var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum = new Adder();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum = new Adder();
    return area;
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}
function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}
function areaRingEnd() {
  areaPoint(x00, y00);
}
var area_default = areaStream;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/bounds.js
var x02 = Infinity;
var y02 = x02;
var x1 = -x02;
var y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function() {
    var bounds = [[x02, y02], [x1, y1]];
    x1 = y1 = -(y02 = x02 = Infinity);
    return bounds;
  }
};
function boundsPoint(x, y) {
  if (x < x02) x02 = x;
  if (x > x1) x1 = x;
  if (y < y02) y02 = y;
  if (y > y1) y1 = y;
}
var bounds_default = boundsStream;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/centroid.js
var X0 = 0;
var Y0 = 0;
var Z0 = 0;
var X1 = 0;
var Y1 = 0;
var Z1 = 0;
var X2 = 0;
var Y2 = 0;
var Z2 = 0;
var x002;
var y002;
var x03;
var y03;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};
function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}
function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x03 = x, y03 = y);
}
function centroidPointLine(x, y) {
  var dx = x - x03, dy = y - y03, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x03 + x) / 2;
  Y1 += z * (y03 + y) / 2;
  Z1 += z;
  centroidPoint(x03 = x, y03 = y);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
  centroidPointRing(x002, y002);
}
function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x002 = x03 = x, y002 = y03 = y);
}
function centroidPointRing(x, y) {
  var dx = x - x03, dy = y - y03, z = sqrt(dx * dx + dy * dy);
  X1 += z * (x03 + x) / 2;
  Y1 += z * (y03 + y) / 2;
  Z1 += z;
  z = y03 * x - x03 * y;
  X2 += z * (x03 + x);
  Y2 += z * (y03 + y);
  Z2 += z * 3;
  centroidPoint(x03 = x, y03 = y);
}
var centroid_default = centroidStream;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/context.js
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/measure.js
var lengthSum = new Adder();
var lengthRing;
var x003;
var y003;
var x04;
var y04;
var lengthStream = {
  point: noop,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x003, y003);
    lengthStream.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum = new Adder();
    return length;
  }
};
function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x003 = x04 = x, y003 = y04 = y;
}
function lengthPoint(x, y) {
  x04 -= x, y04 -= y;
  lengthSum.add(sqrt(x04 * x04 + y04 * y04));
  x04 = x, y04 = y;
}
var measure_default = lengthStream;

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/string.js
var cacheDigits;
var cacheAppend;
var cacheRadius;
var cacheCircle;
var PathString = class {
  constructor(digits) {
    this._append = digits == null ? append : appendRound(digits);
    this._radius = 4.5;
    this._ = "";
  }
  pointRadius(_) {
    this._radius = +_;
    return this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line === 0) this._ += "Z";
    this._point = NaN;
  }
  point(x, y) {
    switch (this._point) {
      case 0: {
        this._append`M${x},${y}`;
        this._point = 1;
        break;
      }
      case 1: {
        this._append`L${x},${y}`;
        break;
      }
      default: {
        this._append`M${x},${y}`;
        if (this._radius !== cacheRadius || this._append !== cacheAppend) {
          const r = this._radius;
          const s = this._;
          this._ = "";
          this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`;
          cacheRadius = r;
          cacheAppend = this._append;
          cacheCircle = this._;
          this._ = s;
        }
        this._ += cacheCircle;
        break;
      }
    }
  }
  result() {
    const result = this._;
    this._ = "";
    return result.length ? result : null;
  }
};
function append(strings) {
  let i = 1;
  this._ += strings[0];
  for (const j = strings.length; i < j; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  const d = Math.floor(digits);
  if (!(d >= 0)) throw new RangeError(`invalid digits: ${digits}`);
  if (d > 15) return append;
  if (d !== cacheDigits) {
    const k = 10 ** d;
    cacheDigits = d;
    cacheAppend = function append2(strings) {
      let i = 1;
      this._ += strings[0];
      for (const j = strings.length; i < j; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }
  return cacheAppend;
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/path/index.js
function path_default(projection2, context) {
  let digits = 3, pointRadius = 4.5, projectionStream, contextStream;
  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      stream_default(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function(object) {
    stream_default(object, projectionStream(area_default));
    return area_default.result();
  };
  path.measure = function(object) {
    stream_default(object, projectionStream(measure_default));
    return measure_default.result();
  };
  path.bounds = function(object) {
    stream_default(object, projectionStream(bounds_default));
    return bounds_default.result();
  };
  path.centroid = function(object) {
    stream_default(object, projectionStream(centroid_default));
    return centroid_default.result();
  };
  path.projection = function(_) {
    if (!arguments.length) return projection2;
    projectionStream = _ == null ? (projection2 = null, identity_default) : (projection2 = _).stream;
    return path;
  };
  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString(digits)) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };
  path.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;
    else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    if (context === null) contextStream = new PathString(digits);
    return path;
  };
  return path.projection(projection2).digits(digits).context(context);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/transform.js
function transformer(methods) {
  return function(stream) {
    var s = new TransformStream();
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) {
    this.stream.point(x, y);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/fit.js
function fit(projection2, fitBounds, object) {
  var clip = projection2.clipExtent && projection2.clipExtent();
  projection2.scale(150).translate([0, 0]);
  if (clip != null) projection2.clipExtent(null);
  stream_default(object, projection2.stream(bounds_default));
  fitBounds(bounds_default.result());
  if (clip != null) projection2.clipExtent(clip);
  return projection2;
}
function fitExtent(projection2, extent, object) {
  return fit(projection2, function(b) {
    var w = extent[1][0] - extent[0][0], h = extent[1][1] - extent[0][1], k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])), x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2, y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection2.scale(150 * k).translate([x, y]);
  }, object);
}
function fitSize(projection2, size, object) {
  return fitExtent(projection2, [[0, 0], size], object);
}
function fitWidth(projection2, width, object) {
  return fit(projection2, function(b) {
    var w = +width, k = w / (b[1][0] - b[0][0]), x = (w - k * (b[1][0] + b[0][0])) / 2, y = -k * b[0][1];
    projection2.scale(150 * k).translate([x, y]);
  }, object);
}
function fitHeight(projection2, height, object) {
  return fit(projection2, function(b) {
    var h = +height, k = h / (b[1][1] - b[0][1]), x = -k * b[0][0], y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection2.scale(150 * k).translate([x, y]);
  }, object);
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/resample.js
var maxDepth = 16;
var cosMinDistance = cos(30 * radians);
function resample_default(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}
function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}
function resample(project, delta2) {
  function resampleLineTo(x05, y05, lambda0, a0, b0, c0, x12, y12, lambda1, a1, b1, c1, depth, stream) {
    var dx = x12 - x05, dy = y12 - y05, d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = sqrt(a * a + b * b + c * c), phi2 = asin(c /= m), lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a), p = project(lambda2, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x05, dy2 = y2 - y05, dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        resampleLineTo(x05, y05, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x12, y12, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x004, y004, a00, b00, c00, lambda0, x05, y05, a0, b0, c0;
    var resampleStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };
    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }
    function lineStart() {
      x05 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }
    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x05, y05, lambda0, a0, b0, c0, x05 = p[0], y05 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x05, y05);
    }
    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }
    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }
    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x004 = x05, y004 = y05, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }
    function ringEnd() {
      resampleLineTo(x05, y05, lambda0, a0, b0, c0, x004, y004, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }
    return resampleStream;
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});
function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx;
    y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}
function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a = cosAlpha * k, b = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx;
    y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}
function projection(project) {
  return projectionMutator(function() {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project, k = 150, x = 480, y = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x05 = null, y05, x12, y12, postclip = identity_default, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
  function projection2(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }
  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees, point[1] * degrees];
  }
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };
  projection2.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = void 0, reset()) : preclip;
  };
  projection2.postclip = function(_) {
    return arguments.length ? (postclip = _, x05 = y05 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? circle_default(theta = _ * radians) : (theta = null, antimeridian_default), reset()) : theta * degrees;
  };
  projection2.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x05 = y05 = x12 = y12 = null, identity_default) : clipRectangle(x05 = +_[0][0], y05 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset()) : x05 == null ? null : [[x05, y05], [x12, y12]];
  };
  projection2.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };
  projection2.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };
  projection2.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };
  projection2.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };
  projection2.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };
  projection2.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };
  projection2.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };
  projection2.precision = function(_) {
    return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };
  projection2.fitExtent = function(extent, object) {
    return fitExtent(projection2, extent, object);
  };
  projection2.fitSize = function(size, object) {
    return fitSize(projection2, size, object);
  };
  projection2.fitWidth = function(width, object) {
    return fitWidth(projection2, width, object);
  };
  projection2.fitHeight = function(height, object) {
    return fitHeight(projection2, height, object);
  };
  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose_default(project, transform);
    projectRotateTransform = compose_default(rotate, projectTransform);
    projectResample = resample_default(projectTransform, delta2);
    return reset();
  }
  function reset() {
    cache = cacheStream = null;
    return projection2;
  }
  return function() {
    project = projectAt.apply(this, arguments);
    projection2.invert = project.invert && invert;
    return recenter();
  };
}

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/projection/naturalEarth1.js
function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi2 - 1529e-6 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4)))
  ];
}
naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 5916e-6 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (3971e-6 - 1529e-6 * phi2)))),
    phi
  ];
};
function naturalEarth1_default() {
  return projection(naturalEarth1Raw).scale(175.295);
}

// create.js
import { createCanvas } from "canvas";
import { createRequire } from "module";

// cities.js
function generateCities() {
  return {
    drinks: [
      { name: "Absolut Vodka", category: "spirit", ingredients: ["vodka"] },
      { name: "Aguardiente", category: "spirit", ingredients: ["anise-flavored cane spirit"] },
      { name: "Aperol Spritz", category: "cocktail", ingredients: ["Aperol", "prosecco", "soda water"] },
      { name: "Aquavit", category: "spirit", ingredients: ["caraway or dill flavored spirit"] },
      { name: "Arabic Coffee", category: "coffee", ingredients: ["arabica coffee", "cardamom"] },
      { name: "Aussie Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Brahma", category: "beer", ingredients: ["lager beer"] },
      { name: "Brenniv\xEDn", category: "spirit", ingredients: ["caraway schnapps"] },
      { name: "Caesar", category: "cocktail", ingredients: ["vodka", "clamato", "hot sauce", "worcestershire"] },
      { name: "Caeser", category: "cocktail", ingredients: ["vodka", "clamato", "hot sauce", "worcestershire"] },
      { name: "Caipirinha", category: "cocktail", ingredients: ["cacha\xE7a", "lime", "sugar"] },
      { name: "Carlsberg", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Castle Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Chang", category: "beer", ingredients: ["lager beer"] },
      { name: "Coconut Toddy", category: "fermented", ingredients: ["fermented coconut palm sap"] },
      { name: "Coconut Water", category: "non-alcoholic", ingredients: ["coconut water"] },
      { name: "Cosmopolitan", category: "cocktail", ingredients: ["vodka", "triple sec", "cranberry juice", "lime"] },
      { name: "Denver Microbrew", category: "beer", ingredients: ["craft beer"] },
      { name: "Doogh", category: "non-alcoholic", ingredients: ["yogurt", "water", "mint", "salt"] },
      { name: "Egri Bikav\xE9r", category: "wine", ingredients: ["red wine blend"] },
      { name: "Fernet y Coca", category: "highball", ingredients: ["fernet", "cola"] },
      { name: "Gin and Tonic", category: "highball", ingredients: ["gin", "tonic water", "lime"] },
      { name: "Green Tea", category: "tea", ingredients: ["green tea"] },
      { name: "Guinness", category: "beer", ingredients: ["dry stout"] },
      { name: "Heineken", category: "beer", ingredients: ["lager beer"] },
      { name: "Highball", category: "highball", ingredients: ["whisky", "soda water"] },
      { name: "Hinano Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Hurricane", category: "cocktail", ingredients: ["dark rum", "light rum", "passion fruit", "citrus"] },
      { name: "Iceberg Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Ikale Ale", category: "beer", ingredients: ["ale beer"] },
      { name: "Irish Coffee", category: "coffee cocktail", ingredients: ["irish whiskey", "coffee", "sugar", "cream"] },
      { name: "Kava", category: "traditional", ingredients: ["kava root", "water"] },
      { name: "Kingfisher", category: "beer", ingredients: ["lager beer"] },
      { name: "Koskenkorva", category: "spirit", ingredients: ["vodka"] },
      { name: "Lager", category: "beer", ingredients: ["lager beer"] },
      { name: "Local IPA", category: "beer", ingredients: ["india pale ale"] },
      { name: "Mai Tai", category: "cocktail", ingredients: ["rum", "orange cura\xE7ao", "lime", "orgeat"] },
      { name: "Margarita", category: "cocktail", ingredients: ["tequila", "lime juice", "orange liqueur"] },
      { name: "Mekong Whisky", category: "spirit", ingredients: ["thai cane-and-rice spirit"] },
      { name: "Moroccan Tea", category: "tea", ingredients: ["green tea", "mint", "sugar"] },
      { name: "Myanmar Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "NT Draught", category: "beer", ingredients: ["draught lager"] },
      { name: "Number One Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Old Fashioned", category: "cocktail", ingredients: ["bourbon or rye", "sugar", "bitters", "orange peel"] },
      { name: "Ouzo", category: "spirit", ingredients: ["anise spirit"] },
      { name: "Paloma", category: "cocktail", ingredients: ["tequila", "grapefruit soda", "lime"] },
      { name: "Pastis", category: "spirit", ingredients: ["anise spirit", "water"] },
      { name: "Pilsner", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Pilsner Urquell", category: "beer", ingredients: ["pilsner beer"] },
      { name: "Pinot Noir", category: "wine", ingredients: ["pinot noir wine"] },
      { name: "Pint of Ale", category: "beer", ingredients: ["ale beer"] },
      { name: "Pisco", category: "spirit", ingredients: ["grape brandy"] },
      { name: "Pisco Sour", category: "cocktail", ingredients: ["pisco", "lime", "sugar", "egg white", "bitters"] },
      { name: "Primus", category: "beer", ingredients: ["lager beer"] },
      { name: "Raki", category: "spirit", ingredients: ["anise spirit"] },
      { name: "Raksi", category: "spirit", ingredients: ["distilled grain spirit"] },
      { name: "Sam Adams", category: "beer", ingredients: ["lager beer"] },
      { name: "Sang Som", category: "spirit", ingredients: ["thai rum"] },
      { name: "Seattle Coffee", category: "coffee", ingredients: ["brewed coffee"] },
      { name: "Soju", category: "spirit", ingredients: ["distilled rice/barley spirit"] },
      { name: "Sparkling Wine", category: "wine", ingredients: ["sparkling wine"] },
      { name: "Speight's", category: "beer", ingredients: ["ale/lager beer"] },
      { name: "Stella", category: "beer", ingredients: ["lager beer"] },
      { name: "Tecate", category: "beer", ingredients: ["lager beer"] },
      { name: "Texas Whiskey", category: "spirit", ingredients: ["whiskey"] },
      { name: "Tiger Beer", category: "beer", ingredients: ["lager beer"] },
      { name: "Tinto de Verano", category: "wine cocktail", ingredients: ["red wine", "lemon soda"] },
      { name: "Toddy", category: "fermented", ingredients: ["fermented palm sap"] },
      { name: "Tsing Tao", category: "beer", ingredients: ["lager beer"] },
      { name: "Tusker", category: "beer", ingredients: ["lager beer"] },
      { name: "VB", category: "beer", ingredients: ["lager beer"] },
      { name: "Verdelho Wine", category: "wine", ingredients: ["verdelho wine"] },
      { name: "Vermouth", category: "fortified wine", ingredients: ["aromatized fortified wine"] },
      { name: "Vinho Verde", category: "wine", ingredients: ["young portuguese wine"] },
      { name: "Vodka", category: "spirit", ingredients: ["vodka"] },
      { name: "Wiener Melange", category: "coffee", ingredients: ["espresso", "steamed milk", "foam"] },
      { name: "\u017Bubr\xF3wka", category: "spirit", ingredients: ["bison grass flavored vodka"] }
    ],
    cities: [
      {
        name: "Dublin",
        country: "Ireland",
        lat: 53.3498,
        lng: -6.2603,
        timeZone: "Europe/Dublin",
        drink: "Guinness"
      },
      {
        name: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        timeZone: "Asia/Tokyo",
        drink: "Highball"
      },
      {
        name: "New Orleans",
        country: "USA",
        lat: 29.9511,
        lng: -90.2623,
        timeZone: "America/Chicago",
        drink: "Hurricane"
      },
      {
        name: "Rio de Janeiro",
        country: "Brazil",
        lat: -22.9068,
        lng: -43.1729,
        timeZone: "America/Sao_Paulo",
        drink: "Caipirinha"
      },
      {
        name: "Barcelona",
        country: "Spain",
        lat: 41.3874,
        lng: 2.1686,
        timeZone: "Europe/Madrid",
        drink: "Vermouth"
      },
      {
        name: "Miami",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        timeZone: "America/New_York",
        drink: "Mojito"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Sang Som"
      },
      {
        name: "Las Vegas",
        country: "USA",
        lat: 36.1699,
        lng: -115.1398,
        timeZone: "America/Los_Angeles",
        drink: "Margarita"
      },
      {
        name: "Amsterdam",
        country: "Netherlands",
        lat: 52.3676,
        lng: 4.9041,
        timeZone: "Europe/Amsterdam",
        drink: "Heineken"
      },
      {
        name: "Canc\xFAn",
        country: "Mexico",
        lat: 21.1629,
        lng: -86.8515,
        timeZone: "America/Mexico_City",
        drink: "Paloma"
      },
      {
        name: "Sydney",
        country: "Australia",
        lat: -33.8688,
        lng: 151.2093,
        timeZone: "Australia/Sydney",
        drink: "Aussie Lager"
      },
      {
        name: "London",
        country: "UK",
        lat: 51.5074,
        lng: -0.1278,
        timeZone: "Europe/London",
        drink: "Pint of Ale"
      },
      {
        name: "Paris",
        country: "France",
        lat: 48.8566,
        lng: 2.3522,
        timeZone: "Europe/Paris",
        drink: "Pastis"
      },
      {
        name: "Berlin",
        country: "Germany",
        lat: 52.52,
        lng: 13.405,
        timeZone: "Europe/Berlin",
        drink: "Pilsner"
      },
      {
        name: "Rome",
        country: "Italy",
        lat: 41.9028,
        lng: 12.4964,
        timeZone: "Europe/Rome",
        drink: "Aperol Spritz"
      },
      {
        name: "Madrid",
        country: "Spain",
        lat: 40.4168,
        lng: -3.7038,
        timeZone: "Europe/Madrid",
        drink: "Tinto de Verano"
      },
      {
        name: "Moscow",
        country: "Russia",
        lat: 55.7558,
        lng: 37.6173,
        timeZone: "Europe/Moscow",
        drink: "Vodka"
      },
      {
        name: "Dubai",
        country: "UAE",
        lat: 25.2048,
        lng: 55.2708,
        timeZone: "Asia/Dubai",
        drink: "Arabic Coffee"
      },
      {
        name: "Singapore",
        country: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        timeZone: "Asia/Singapore",
        drink: "Tiger Beer"
      },
      {
        name: "Hong Kong",
        country: "Hong Kong",
        lat: 22.3193,
        lng: 114.1694,
        timeZone: "Asia/Hong_Kong",
        drink: "Tsing Tao"
      },
      {
        name: "Seoul",
        country: "South Korea",
        lat: 37.5665,
        lng: 126.978,
        timeZone: "Asia/Seoul",
        drink: "Soju"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Sang Som"
      },
      {
        name: "Mumbai",
        country: "India",
        lat: 19.076,
        lng: 72.8777,
        timeZone: "Asia/Kolkata",
        drink: "Kingfisher"
      },
      {
        name: "Delhi",
        country: "India",
        lat: 28.7041,
        lng: 77.1025,
        timeZone: "Asia/Kolkata",
        drink: "Kingfisher"
      },
      {
        name: "Istanbul",
        country: "Turkey",
        lat: 41.0082,
        lng: 28.9784,
        timeZone: "Europe/Istanbul",
        drink: "Raki"
      },
      {
        name: "Cairo",
        country: "Egypt",
        lat: 30.0444,
        lng: 31.2357,
        timeZone: "Africa/Cairo",
        drink: "Stella"
      },
      {
        name: "Johannesburg",
        country: "South Africa",
        lat: -26.2023,
        lng: 28.0436,
        timeZone: "Africa/Johannesburg",
        drink: "Castle Lager"
      },
      {
        name: "Cape Town",
        country: "South Africa",
        lat: -33.9249,
        lng: 18.4241,
        timeZone: "Africa/Johannesburg",
        drink: "Primus"
      },
      {
        name: "Marrakech",
        country: "Morocco",
        lat: 31.6295,
        lng: -7.9811,
        timeZone: "Africa/Casablanca",
        drink: "Moroccan Tea"
      },
      {
        name: "Mexico City",
        country: "Mexico",
        lat: 19.4326,
        lng: -99.1332,
        timeZone: "America/Mexico_City",
        drink: "Tecate"
      },
      {
        name: "S\xE3o Paulo",
        country: "Brazil",
        lat: -23.5505,
        lng: -46.6333,
        timeZone: "America/Sao_Paulo",
        drink: "Brahma"
      },
      {
        name: "Buenos Aires",
        country: "Argentina",
        lat: -34.6037,
        lng: -58.3816,
        timeZone: "America/Argentina/Buenos_Aires",
        drink: "Fernet y Coca"
      },
      {
        name: "Lima",
        country: "Peru",
        lat: -12.0464,
        lng: -77.0428,
        timeZone: "America/Lima",
        drink: "Pisco Sour"
      },
      {
        name: "Bogot\xE1",
        country: "Colombia",
        lat: 4.711,
        lng: -74.0721,
        timeZone: "America/Bogota",
        drink: "Aguardiente"
      },
      {
        name: "Santiago",
        country: "Chile",
        lat: -33.8688,
        lng: -51.2093,
        timeZone: "America/Santiago",
        drink: "Pisco"
      },
      {
        name: "Toronto",
        country: "Canada",
        lat: 43.6532,
        lng: -79.3832,
        timeZone: "America/Toronto",
        drink: "Caeser"
      },
      {
        name: "Vancouver",
        country: "Canada",
        lat: 49.2827,
        lng: -123.1207,
        timeZone: "America/Vancouver",
        drink: "Local IPA"
      },
      {
        name: "New York",
        country: "USA",
        lat: 40.7128,
        lng: -74.006,
        timeZone: "America/New_York",
        drink: "Cosmopolitan"
      },
      {
        name: "Los Angeles",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        timeZone: "America/Los_Angeles",
        drink: "Margarita"
      },
      {
        name: "San Francisco",
        country: "USA",
        lat: 37.7749,
        lng: -122.4194,
        timeZone: "America/Los_Angeles",
        drink: "Irish Coffee"
      },
      {
        name: "Chicago",
        country: "USA",
        lat: 41.8781,
        lng: -87.6298,
        timeZone: "America/Chicago",
        drink: "Old Fashioned"
      },
      {
        name: "Seattle",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321,
        timeZone: "America/Los_Angeles",
        drink: "Seattle Coffee"
      },
      {
        name: "Denver",
        country: "USA",
        lat: 39.7392,
        lng: -104.9903,
        timeZone: "America/Denver",
        drink: "Denver Microbrew"
      },
      {
        name: "Austin",
        country: "USA",
        lat: 30.2672,
        lng: -97.7431,
        timeZone: "America/Chicago",
        drink: "Texas Whiskey"
      },
      {
        name: "Boston",
        country: "USA",
        lat: 42.3601,
        lng: -71.0589,
        timeZone: "America/New_York",
        drink: "Sam Adams"
      },
      {
        name: "Melbourne",
        country: "Australia",
        lat: -37.8136,
        lng: 144.9631,
        timeZone: "Australia/Melbourne",
        drink: "VB"
      },
      {
        name: "Auckland",
        country: "New Zealand",
        lat: -37.0082,
        lng: 174.785,
        timeZone: "Pacific/Auckland",
        drink: "Speight's"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Chang"
      },
      {
        name: "Vienna",
        country: "Austria",
        lat: 48.2082,
        lng: 16.3738,
        timeZone: "Europe/Vienna",
        drink: "Wiener Melange"
      },
      {
        name: "Prague",
        country: "Czech Republic",
        lat: 50.0755,
        lng: 14.4378,
        timeZone: "Europe/Prague",
        drink: "Pilsner Urquell"
      },
      {
        name: "Budapest",
        country: "Hungary",
        lat: 47.4979,
        lng: 19.0402,
        timeZone: "Europe/Budapest",
        drink: "Egri Bikav\xE9r"
      },
      {
        name: "Warsaw",
        country: "Poland",
        lat: 52.2297,
        lng: 21.0122,
        timeZone: "Europe/Warsaw",
        drink: "\u017Bubr\xF3wka"
      },
      {
        name: "Athens",
        country: "Greece",
        lat: 37.9838,
        lng: 23.7275,
        timeZone: "Europe/Athens",
        drink: "Ouzo"
      },
      {
        name: "Lisbon",
        country: "Portugal",
        lat: 38.7223,
        lng: -9.1393,
        timeZone: "Europe/Lisbon",
        drink: "Vinho Verde"
      },
      {
        name: "Stockholm",
        country: "Sweden",
        lat: 59.3293,
        lng: 18.0686,
        timeZone: "Europe/Stockholm",
        drink: "Absolut Vodka"
      },
      {
        name: "Copenhagen",
        country: "Denmark",
        lat: 55.6761,
        lng: 12.5883,
        timeZone: "Europe/Copenhagen",
        drink: "Carlsberg"
      },
      {
        name: "Oslo",
        country: "Norway",
        lat: 59.9139,
        lng: 10.7522,
        timeZone: "Europe/Oslo",
        drink: "Aquavit"
      },
      {
        name: "Helsinki",
        country: "Finland",
        lat: 60.1695,
        lng: 24.9354,
        timeZone: "Europe/Helsinki",
        drink: "Koskenkorva"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Mekong Whisky"
      },
      {
        name: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        timeZone: "Asia/Bangkok",
        drink: "Mekong Whisky"
      },
      // Added for full UTC offset coverage
      {
        name: "Baker Island",
        country: "US Minor Outlying Islands",
        lat: 0.1936,
        lng: -176.4769,
        timeZone: "Etc/GMT+12",
        // UTC-12
        drink: "Coconut Water"
      },
      {
        name: "Pago Pago",
        country: "American Samoa",
        lat: -14.2756,
        lng: -170.702,
        timeZone: "Pacific/Pago_Pago",
        // UTC-11
        drink: "Kava"
      },
      {
        name: "Honolulu",
        country: "USA",
        lat: 21.3069,
        lng: -157.8583,
        timeZone: "Pacific/Honolulu",
        // UTC-10
        drink: "Mai Tai"
      },
      {
        name: "Taiohae",
        country: "French Polynesia",
        lat: -8.9109,
        lng: -140.0997,
        timeZone: "Pacific/Marquesas",
        // UTC-9:30
        drink: "Hinano Beer"
      },
      {
        name: "St. John's",
        country: "Canada",
        lat: 47.5615,
        lng: -52.7126,
        timeZone: "America/St_Johns",
        // UTC-3:30
        drink: "Iceberg Beer"
      },
      {
        name: "Fernando de Noronha",
        country: "Brazil",
        lat: -3.8547,
        lng: -32.424,
        timeZone: "America/Noronha",
        // UTC-2
        drink: "Caipirinha"
      },
      {
        name: "Ponta Delgada",
        country: "Portugal",
        lat: 37.7412,
        lng: -25.6756,
        timeZone: "Atlantic/Azores",
        // UTC-1
        drink: "Verdelho Wine"
      },
      {
        name: "Reykjav\xEDk",
        country: "Iceland",
        lat: 64.1466,
        lng: -21.9426,
        timeZone: "Atlantic/Reykjavik",
        // UTC+0
        drink: "Brenniv\xEDn"
      },
      {
        name: "Nairobi",
        country: "Kenya",
        lat: -1.2921,
        lng: 36.8219,
        timeZone: "Africa/Nairobi",
        // UTC+3
        drink: "Tusker"
      },
      {
        name: "Tehran",
        country: "Iran",
        lat: 35.6892,
        lng: 51.389,
        timeZone: "Asia/Tehran",
        // UTC+3:30
        drink: "Doogh"
      },
      {
        name: "Kabul",
        country: "Afghanistan",
        lat: 34.5553,
        lng: 69.2075,
        timeZone: "Asia/Kabul",
        // UTC+4:30
        drink: "Green Tea"
      },
      {
        name: "Kathmandu",
        country: "Nepal",
        lat: 27.7172,
        lng: 85.324,
        timeZone: "Asia/Kathmandu",
        // UTC+5:45
        drink: "Raksi"
      },
      {
        name: "Yangon",
        country: "Myanmar",
        lat: 16.8409,
        lng: 96.1735,
        timeZone: "Asia/Yangon",
        // UTC+6:30
        drink: "Myanmar Beer"
      },
      {
        name: "Eucla",
        country: "Australia",
        lat: -31.7167,
        lng: 128.8833,
        timeZone: "Australia/Eucla",
        // UTC+8:45
        drink: "Lager"
      },
      {
        name: "Darwin",
        country: "Australia",
        lat: -12.4634,
        lng: 130.8456,
        timeZone: "Australia/Darwin",
        // UTC+9:30
        drink: "NT Draught"
      },
      {
        name: "Lord Howe Island",
        country: "Australia",
        lat: -31.552,
        lng: 159.0769,
        timeZone: "Australia/Lord_Howe",
        // UTC+10:30
        drink: "Sparkling Wine"
      },
      {
        name: "Noum\xE9a",
        country: "New Caledonia",
        lat: -22.2758,
        lng: 166.458,
        timeZone: "Pacific/Noumea",
        // UTC+11
        drink: "Number One Beer"
      },
      {
        name: "Tarawa",
        country: "Kiribati",
        lat: 1.4518,
        lng: 172.9717,
        timeZone: "Pacific/Tarawa",
        // UTC+12
        drink: "Toddy"
      },
      {
        name: "Waitangi (Chatham Islands)",
        country: "New Zealand",
        lat: -43.9535,
        lng: -176.5597,
        timeZone: "Pacific/Chatham",
        // UTC+12:45
        drink: "Pinot Noir"
      },
      {
        name: "Nuku'alofa",
        country: "Tonga",
        lat: -21.1394,
        lng: -175.2049,
        timeZone: "Pacific/Tongatapu",
        // UTC+13
        drink: "Ikale Ale"
      },
      {
        name: "Kiritimati",
        country: "Kiribati",
        lat: 1.8721,
        lng: -157.4278,
        timeZone: "Pacific/Kiritimati",
        // UTC+14
        drink: "Coconut Toddy"
      }
    ]
  };
}

// create.js
var require2 = createRequire(import.meta.url);
var worldGeoJSON = require2("./world-110m.geojson");
var { cities, drinks } = generateCities();
function generateMapImage(city) {
  const width = 400;
  const height = 240;
  const projection2 = naturalEarth1_default().fitSize([width, height], worldGeoJSON);
  const path = path_default().projection(projection2);
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#ddd";
  context.strokeStyle = "#aaa";
  context.lineWidth = 0.35;
  worldGeoJSON.features.forEach((feature) => {
    context.beginPath();
    path.context(context)(feature);
    context.fill();
    context.stroke();
  });
  const [x, y] = projection2([city.lng, city.lat]);
  context.fillStyle = "#888";
  context.beginPath();
  context.arc(x, y, 4, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#000";
  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2);
  context.fill();
  return canvas.toBuffer("image/png");
}
function getLocalMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour").value);
  const minute = Number(parts.find((p) => p.type === "minute").value);
  return hour * 60 + minute;
}
function minutesUntilFive(localMinutes) {
  const fivePM = 17 * 60;
  return (fivePM - localMinutes + 1440) % 1440;
}
function getLocalTimeString(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(date);
}
var state = {
  current: null,
  next: null
};
function generateFiveOClock() {
  const now = /* @__PURE__ */ new Date();
  const enriched = cities.map((city) => {
    const localMinutes = getLocalMinutes(now, city.timeZone);
    const until = minutesUntilFive(localMinutes);
    return {
      ...city,
      minutesUntil: until,
      distanceFromFive: Math.min(until, 1440 - until)
    };
  });
  const sorted = [...enriched].sort(
    (a, b) => a.distanceFromFive - b.distanceFromFive
  );
  const currentChoices = sorted.slice(0, 5);
  if (state.current) {
    const stillCurrent = currentChoices.find((c) => c.name === state.current.name);
    if (stillCurrent) {
      const untilNext = minutesUntilFive(getLocalMinutes(now, state.next.timeZone));
      return {
        ...state.current,
        localTime: getLocalTimeString(now, state.current.timeZone),
        utc: now.toISOString(),
        nextPlace: state.next.name,
        nextCountry: state.next.country,
        minutesUntilNext: untilNext,
        img: generateMapImage(state.current)
      };
    }
  }
  const current = currentChoices[Math.floor(Math.random() * currentChoices.length)];
  const next = [...enriched].filter((c) => c.minutesUntil > 0).sort((a, b) => a.minutesUntil - b.minutesUntil)[0];
  state.current = current;
  state.next = next;
  return {
    place: current.name,
    country: current.country,
    localDrink: current.drink,
    drinkIngredients: drinks.find((d) => d.name === current.drink)?.ingredients?.join(" | ") || [],
    drinkCategory: drinks.find((d) => d.name === current.drink)?.category || "unknown",
    localTime: getLocalTimeString(now, current.timeZone),
    utc: now.toISOString(),
    nextPlace: next.name,
    nextCountry: next.country,
    minutesUntilNext: next.minutesUntil,
    img: generateMapImage(current)
  };
}
var create_default = generateFiveOClock;

// index.js
var index_default = create_default;
export {
  index_default as default
};
