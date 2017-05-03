'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minidb = require('minidb');

var _fulcrumCore = require('fulcrum-core');

class Signature {
  static get tableName() {
    return 'signatures';
  }

  static get columns() {
    return [{ name: 'accountRowID', column: 'account_id', type: 'integer', null: false }, { name: 'id', column: 'resource_id', type: 'string', null: false }, { name: 'filePath', column: 'file_path', type: 'string' }, { name: 'isDownloaded', column: 'is_downloaded', type: 'boolean', null: false }, { name: 'formRowID', column: 'form_id', type: 'integer' }, { name: 'recordRowID', column: 'record_id', type: 'integer' }];
  }

  get id() {
    return this._id;
  }

  updateFromAPIAttributes(attributes) {
    this._id = attributes.access_key;
    this._createdAt = _fulcrumCore.DateUtils.parseISOTimestamp(attributes.created_at);
    this._updatedAt = _fulcrumCore.DateUtils.parseISOTimestamp(attributes.updated_at);
  }

  get isDownloaded() {
    return this._isDownloaded;
  }

  set isDownloaded(value) {
    this._isDownloaded = !!value;
  }
}

exports.default = Signature;
_minidb.PersistentObject.register(Signature);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL21vZGVscy9zaWduYXR1cmUuanMiXSwibmFtZXMiOlsiU2lnbmF0dXJlIiwidGFibGVOYW1lIiwiY29sdW1ucyIsIm5hbWUiLCJjb2x1bW4iLCJ0eXBlIiwibnVsbCIsImlkIiwiX2lkIiwidXBkYXRlRnJvbUFQSUF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVzIiwiYWNjZXNzX2tleSIsIl9jcmVhdGVkQXQiLCJwYXJzZUlTT1RpbWVzdGFtcCIsImNyZWF0ZWRfYXQiLCJfdXBkYXRlZEF0IiwidXBkYXRlZF9hdCIsImlzRG93bmxvYWRlZCIsIl9pc0Rvd25sb2FkZWQiLCJ2YWx1ZSIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFZSxNQUFNQSxTQUFOLENBQWdCO0FBQzdCLGFBQVdDLFNBQVgsR0FBdUI7QUFDckIsV0FBTyxZQUFQO0FBQ0Q7O0FBRUQsYUFBV0MsT0FBWCxHQUFxQjtBQUNuQixXQUFPLENBQ0wsRUFBRUMsTUFBTSxjQUFSLEVBQXdCQyxRQUFRLFlBQWhDLEVBQThDQyxNQUFNLFNBQXBELEVBQStEQyxNQUFNLEtBQXJFLEVBREssRUFFTCxFQUFFSCxNQUFNLElBQVIsRUFBY0MsUUFBUSxhQUF0QixFQUFxQ0MsTUFBTSxRQUEzQyxFQUFxREMsTUFBTSxLQUEzRCxFQUZLLEVBR0wsRUFBRUgsTUFBTSxVQUFSLEVBQW9CQyxRQUFRLFdBQTVCLEVBQXlDQyxNQUFNLFFBQS9DLEVBSEssRUFJTCxFQUFFRixNQUFNLGNBQVIsRUFBd0JDLFFBQVEsZUFBaEMsRUFBaURDLE1BQU0sU0FBdkQsRUFBa0VDLE1BQU0sS0FBeEUsRUFKSyxFQUtMLEVBQUVILE1BQU0sV0FBUixFQUFxQkMsUUFBUSxTQUE3QixFQUF3Q0MsTUFBTSxTQUE5QyxFQUxLLEVBTUwsRUFBRUYsTUFBTSxhQUFSLEVBQXVCQyxRQUFRLFdBQS9CLEVBQTRDQyxNQUFNLFNBQWxELEVBTkssQ0FBUDtBQVFEOztBQUVELE1BQUlFLEVBQUosR0FBUztBQUNQLFdBQU8sS0FBS0MsR0FBWjtBQUNEOztBQUVEQywwQkFBd0JDLFVBQXhCLEVBQW9DO0FBQ2xDLFNBQUtGLEdBQUwsR0FBV0UsV0FBV0MsVUFBdEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVQyxpQkFBVixDQUE0QkgsV0FBV0ksVUFBdkMsQ0FBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVRixpQkFBVixDQUE0QkgsV0FBV00sVUFBdkMsQ0FBbEI7QUFDRDs7QUFFRCxNQUFJQyxZQUFKLEdBQW1CO0FBQ2pCLFdBQU8sS0FBS0MsYUFBWjtBQUNEOztBQUVELE1BQUlELFlBQUosQ0FBaUJFLEtBQWpCLEVBQXdCO0FBQ3RCLFNBQUtELGFBQUwsR0FBcUIsQ0FBQyxDQUFDQyxLQUF2QjtBQUNEO0FBaEM0Qjs7a0JBQVZuQixTO0FBbUNyQix5QkFBaUJvQixRQUFqQixDQUEwQnBCLFNBQTFCIiwiZmlsZSI6InNpZ25hdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBlcnNpc3RlbnRPYmplY3QgfSBmcm9tICdtaW5pZGInO1xuaW1wb3J0IHsgRGF0ZVV0aWxzIH0gZnJvbSAnZnVsY3J1bS1jb3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbmF0dXJlIHtcbiAgc3RhdGljIGdldCB0YWJsZU5hbWUoKSB7XG4gICAgcmV0dXJuICdzaWduYXR1cmVzJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgeyBuYW1lOiAnYWNjb3VudFJvd0lEJywgY29sdW1uOiAnYWNjb3VudF9pZCcsIHR5cGU6ICdpbnRlZ2VyJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2lkJywgY29sdW1uOiAncmVzb3VyY2VfaWQnLCB0eXBlOiAnc3RyaW5nJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2ZpbGVQYXRoJywgY29sdW1uOiAnZmlsZV9wYXRoJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgIHsgbmFtZTogJ2lzRG93bmxvYWRlZCcsIGNvbHVtbjogJ2lzX2Rvd25sb2FkZWQnLCB0eXBlOiAnYm9vbGVhbicsIG51bGw6IGZhbHNlIH0sXG4gICAgICB7IG5hbWU6ICdmb3JtUm93SUQnLCBjb2x1bW46ICdmb3JtX2lkJywgdHlwZTogJ2ludGVnZXInIH0sXG4gICAgICB7IG5hbWU6ICdyZWNvcmRSb3dJRCcsIGNvbHVtbjogJ3JlY29yZF9pZCcsIHR5cGU6ICdpbnRlZ2VyJyB9XG4gICAgXTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICB1cGRhdGVGcm9tQVBJQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy5faWQgPSBhdHRyaWJ1dGVzLmFjY2Vzc19rZXk7XG4gICAgdGhpcy5fY3JlYXRlZEF0ID0gRGF0ZVV0aWxzLnBhcnNlSVNPVGltZXN0YW1wKGF0dHJpYnV0ZXMuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5fdXBkYXRlZEF0ID0gRGF0ZVV0aWxzLnBhcnNlSVNPVGltZXN0YW1wKGF0dHJpYnV0ZXMudXBkYXRlZF9hdCk7XG4gIH1cblxuICBnZXQgaXNEb3dubG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0Rvd25sb2FkZWQ7XG4gIH1cblxuICBzZXQgaXNEb3dubG9hZGVkKHZhbHVlKSB7XG4gICAgdGhpcy5faXNEb3dubG9hZGVkID0gISF2YWx1ZTtcbiAgfVxufVxuXG5QZXJzaXN0ZW50T2JqZWN0LnJlZ2lzdGVyKFNpZ25hdHVyZSk7XG4iXX0=