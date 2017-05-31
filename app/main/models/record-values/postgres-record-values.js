'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recordValues = require('./record-values');

var _recordValues2 = _interopRequireDefault(_recordValues);

var _pgFormat = require('pg-format');

var _pgFormat2 = _interopRequireDefault(_pgFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresRecordValues extends _recordValues2.default {
  static setupSearch(values, feature) {
    const searchableValue = feature.searchableValue;

    values.record_index_text = searchableValue;
    values.record_index = { raw: `to_tsvector('simple', ${(0, _pgFormat2.default)('%L', searchableValue)})` };

    return values;
  }

  static setupPoint(values, latitude, longitude) {
    const wkt = (0, _pgFormat2.default)('POINT(%s %s)', longitude, latitude);

    return { raw: `ST_Force2D(ST_SetSRID(ST_GeomFromText('${wkt}'), 4326))` };
  }
}
exports.default = PostgresRecordValues;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL21vZGVscy9yZWNvcmQtdmFsdWVzL3Bvc3RncmVzLXJlY29yZC12YWx1ZXMuanMiXSwibmFtZXMiOlsiUG9zdGdyZXNSZWNvcmRWYWx1ZXMiLCJzZXR1cFNlYXJjaCIsInZhbHVlcyIsImZlYXR1cmUiLCJzZWFyY2hhYmxlVmFsdWUiLCJyZWNvcmRfaW5kZXhfdGV4dCIsInJlY29yZF9pbmRleCIsInJhdyIsInNldHVwUG9pbnQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIndrdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRWUsTUFBTUEsb0JBQU4sZ0NBQWdEO0FBQzdELFNBQU9DLFdBQVAsQ0FBbUJDLE1BQW5CLEVBQTJCQyxPQUEzQixFQUFvQztBQUNsQyxVQUFNQyxrQkFBa0JELFFBQVFDLGVBQWhDOztBQUVBRixXQUFPRyxpQkFBUCxHQUEyQkQsZUFBM0I7QUFDQUYsV0FBT0ksWUFBUCxHQUFzQixFQUFDQyxLQUFNLHlCQUF5Qix3QkFBUyxJQUFULEVBQWVILGVBQWYsQ0FBaUMsR0FBakUsRUFBdEI7O0FBRUEsV0FBT0YsTUFBUDtBQUNEOztBQUVELFNBQU9NLFVBQVAsQ0FBa0JOLE1BQWxCLEVBQTBCTyxRQUExQixFQUFvQ0MsU0FBcEMsRUFBK0M7QUFDN0MsVUFBTUMsTUFBTSx3QkFBUyxjQUFULEVBQXlCRCxTQUF6QixFQUFvQ0QsUUFBcEMsQ0FBWjs7QUFFQSxXQUFPLEVBQUNGLEtBQU0sMENBQTBDSSxHQUFLLFlBQXRELEVBQVA7QUFDRDtBQWQ0RDtrQkFBMUNYLG9CIiwiZmlsZSI6InBvc3RncmVzLXJlY29yZC12YWx1ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVjb3JkVmFsdWVzIGZyb20gJy4vcmVjb3JkLXZhbHVlcyc7XG5pbXBvcnQgcGdmb3JtYXQgZnJvbSAncGctZm9ybWF0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZXNSZWNvcmRWYWx1ZXMgZXh0ZW5kcyBSZWNvcmRWYWx1ZXMge1xuICBzdGF0aWMgc2V0dXBTZWFyY2godmFsdWVzLCBmZWF0dXJlKSB7XG4gICAgY29uc3Qgc2VhcmNoYWJsZVZhbHVlID0gZmVhdHVyZS5zZWFyY2hhYmxlVmFsdWU7XG5cbiAgICB2YWx1ZXMucmVjb3JkX2luZGV4X3RleHQgPSBzZWFyY2hhYmxlVmFsdWU7XG4gICAgdmFsdWVzLnJlY29yZF9pbmRleCA9IHtyYXc6IGB0b190c3ZlY3Rvcignc2ltcGxlJywgJHsgcGdmb3JtYXQoJyVMJywgc2VhcmNoYWJsZVZhbHVlKSB9KWB9O1xuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxuXG4gIHN0YXRpYyBzZXR1cFBvaW50KHZhbHVlcywgbGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICAgIGNvbnN0IHdrdCA9IHBnZm9ybWF0KCdQT0lOVCglcyAlcyknLCBsb25naXR1ZGUsIGxhdGl0dWRlKTtcblxuICAgIHJldHVybiB7cmF3OiBgU1RfRm9yY2UyRChTVF9TZXRTUklEKFNUX0dlb21Gcm9tVGV4dCgnJHsgd2t0IH0nKSwgNDMyNikpYH07XG4gIH1cbn1cbiJdfQ==