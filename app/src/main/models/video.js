'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minidb = require('minidb');

var _fulcrumCore = require('fulcrum-core');

class Video {
  static get tableName() {
    return 'videos';
  }

  static get columns() {
    return [{ name: 'accountRowID', column: 'account_id', type: 'integer', null: false }, { name: 'id', column: 'resource_id', type: 'string', null: false }, { name: 'metadata', column: 'metadata', type: 'json' }, { name: 'filePath', column: 'file_path', type: 'string' }, { name: 'isDownloaded', column: 'is_downloaded', type: 'boolean', null: false }, { name: 'formRowID', column: 'form_id', type: 'integer' }, { name: 'recordRowID', column: 'record_id', type: 'integer' }];
  }

  get id() {
    return this._id;
  }

  updateFromAPIAttributes(attributes) {
    this._id = attributes.access_key;
    this._metadata = attributes.metadata;
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

exports.default = Video;
_minidb.PersistentObject.register(Video);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL21vZGVscy92aWRlby5qcyJdLCJuYW1lcyI6WyJWaWRlbyIsInRhYmxlTmFtZSIsImNvbHVtbnMiLCJuYW1lIiwiY29sdW1uIiwidHlwZSIsIm51bGwiLCJpZCIsIl9pZCIsInVwZGF0ZUZyb21BUElBdHRyaWJ1dGVzIiwiYXR0cmlidXRlcyIsImFjY2Vzc19rZXkiLCJfbWV0YWRhdGEiLCJtZXRhZGF0YSIsIl9jcmVhdGVkQXQiLCJwYXJzZUlTT1RpbWVzdGFtcCIsImNyZWF0ZWRfYXQiLCJfdXBkYXRlZEF0IiwidXBkYXRlZF9hdCIsImlzRG93bmxvYWRlZCIsIl9pc0Rvd25sb2FkZWQiLCJ2YWx1ZSIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFZSxNQUFNQSxLQUFOLENBQVk7QUFDekIsYUFBV0MsU0FBWCxHQUF1QjtBQUNyQixXQUFPLFFBQVA7QUFDRDs7QUFFRCxhQUFXQyxPQUFYLEdBQXFCO0FBQ25CLFdBQU8sQ0FDTCxFQUFFQyxNQUFNLGNBQVIsRUFBd0JDLFFBQVEsWUFBaEMsRUFBOENDLE1BQU0sU0FBcEQsRUFBK0RDLE1BQU0sS0FBckUsRUFESyxFQUVMLEVBQUVILE1BQU0sSUFBUixFQUFjQyxRQUFRLGFBQXRCLEVBQXFDQyxNQUFNLFFBQTNDLEVBQXFEQyxNQUFNLEtBQTNELEVBRkssRUFHTCxFQUFFSCxNQUFNLFVBQVIsRUFBb0JDLFFBQVEsVUFBNUIsRUFBd0NDLE1BQU0sTUFBOUMsRUFISyxFQUlMLEVBQUVGLE1BQU0sVUFBUixFQUFvQkMsUUFBUSxXQUE1QixFQUF5Q0MsTUFBTSxRQUEvQyxFQUpLLEVBS0wsRUFBRUYsTUFBTSxjQUFSLEVBQXdCQyxRQUFRLGVBQWhDLEVBQWlEQyxNQUFNLFNBQXZELEVBQWtFQyxNQUFNLEtBQXhFLEVBTEssRUFNTCxFQUFFSCxNQUFNLFdBQVIsRUFBcUJDLFFBQVEsU0FBN0IsRUFBd0NDLE1BQU0sU0FBOUMsRUFOSyxFQU9MLEVBQUVGLE1BQU0sYUFBUixFQUF1QkMsUUFBUSxXQUEvQixFQUE0Q0MsTUFBTSxTQUFsRCxFQVBLLENBQVA7QUFTRDs7QUFFRCxNQUFJRSxFQUFKLEdBQVM7QUFDUCxXQUFPLEtBQUtDLEdBQVo7QUFDRDs7QUFFREMsMEJBQXdCQyxVQUF4QixFQUFvQztBQUNsQyxTQUFLRixHQUFMLEdBQVdFLFdBQVdDLFVBQXRCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkYsV0FBV0csUUFBNUI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVQyxpQkFBVixDQUE0QkwsV0FBV00sVUFBdkMsQ0FBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVRixpQkFBVixDQUE0QkwsV0FBV1EsVUFBdkMsQ0FBbEI7QUFDRDs7QUFFRCxNQUFJQyxZQUFKLEdBQW1CO0FBQ2pCLFdBQU8sS0FBS0MsYUFBWjtBQUNEOztBQUVELE1BQUlELFlBQUosQ0FBaUJFLEtBQWpCLEVBQXdCO0FBQ3RCLFNBQUtELGFBQUwsR0FBcUIsQ0FBQyxDQUFDQyxLQUF2QjtBQUNEO0FBbEN3Qjs7a0JBQU5yQixLO0FBcUNyQix5QkFBaUJzQixRQUFqQixDQUEwQnRCLEtBQTFCIiwiZmlsZSI6InZpZGVvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGVyc2lzdGVudE9iamVjdCB9IGZyb20gJ21pbmlkYic7XG5pbXBvcnQgeyBEYXRlVXRpbHMgfSBmcm9tICdmdWxjcnVtLWNvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlbyB7XG4gIHN0YXRpYyBnZXQgdGFibGVOYW1lKCkge1xuICAgIHJldHVybiAndmlkZW9zJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgY29sdW1ucygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgeyBuYW1lOiAnYWNjb3VudFJvd0lEJywgY29sdW1uOiAnYWNjb3VudF9pZCcsIHR5cGU6ICdpbnRlZ2VyJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2lkJywgY29sdW1uOiAncmVzb3VyY2VfaWQnLCB0eXBlOiAnc3RyaW5nJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ21ldGFkYXRhJywgY29sdW1uOiAnbWV0YWRhdGEnLCB0eXBlOiAnanNvbicgfSxcbiAgICAgIHsgbmFtZTogJ2ZpbGVQYXRoJywgY29sdW1uOiAnZmlsZV9wYXRoJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgIHsgbmFtZTogJ2lzRG93bmxvYWRlZCcsIGNvbHVtbjogJ2lzX2Rvd25sb2FkZWQnLCB0eXBlOiAnYm9vbGVhbicsIG51bGw6IGZhbHNlIH0sXG4gICAgICB7IG5hbWU6ICdmb3JtUm93SUQnLCBjb2x1bW46ICdmb3JtX2lkJywgdHlwZTogJ2ludGVnZXInIH0sXG4gICAgICB7IG5hbWU6ICdyZWNvcmRSb3dJRCcsIGNvbHVtbjogJ3JlY29yZF9pZCcsIHR5cGU6ICdpbnRlZ2VyJyB9XG4gICAgXTtcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICB1cGRhdGVGcm9tQVBJQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy5faWQgPSBhdHRyaWJ1dGVzLmFjY2Vzc19rZXk7XG4gICAgdGhpcy5fbWV0YWRhdGEgPSBhdHRyaWJ1dGVzLm1ldGFkYXRhO1xuICAgIHRoaXMuX2NyZWF0ZWRBdCA9IERhdGVVdGlscy5wYXJzZUlTT1RpbWVzdGFtcChhdHRyaWJ1dGVzLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuX3VwZGF0ZWRBdCA9IERhdGVVdGlscy5wYXJzZUlTT1RpbWVzdGFtcChhdHRyaWJ1dGVzLnVwZGF0ZWRfYXQpO1xuICB9XG5cbiAgZ2V0IGlzRG93bmxvYWRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEb3dubG9hZGVkO1xuICB9XG5cbiAgc2V0IGlzRG93bmxvYWRlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2lzRG93bmxvYWRlZCA9ICEhdmFsdWU7XG4gIH1cbn1cblxuUGVyc2lzdGVudE9iamVjdC5yZWdpc3RlcihWaWRlbyk7XG4iXX0=