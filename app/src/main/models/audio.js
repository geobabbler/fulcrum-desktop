'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minidb = require('minidb');

var _fulcrumCore = require('fulcrum-core');

class Audio {
  static get tableName() {
    return 'audio';
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

exports.default = Audio;
_minidb.PersistentObject.register(Audio);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL21vZGVscy9hdWRpby5qcyJdLCJuYW1lcyI6WyJBdWRpbyIsInRhYmxlTmFtZSIsImNvbHVtbnMiLCJuYW1lIiwiY29sdW1uIiwidHlwZSIsIm51bGwiLCJpZCIsIl9pZCIsInVwZGF0ZUZyb21BUElBdHRyaWJ1dGVzIiwiYXR0cmlidXRlcyIsImFjY2Vzc19rZXkiLCJfbWV0YWRhdGEiLCJtZXRhZGF0YSIsIl9jcmVhdGVkQXQiLCJwYXJzZUlTT1RpbWVzdGFtcCIsImNyZWF0ZWRfYXQiLCJfdXBkYXRlZEF0IiwidXBkYXRlZF9hdCIsImlzRG93bmxvYWRlZCIsIl9pc0Rvd25sb2FkZWQiLCJ2YWx1ZSIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7QUFFZSxNQUFNQSxLQUFOLENBQVk7QUFDekIsYUFBV0MsU0FBWCxHQUF1QjtBQUNyQixXQUFPLE9BQVA7QUFDRDs7QUFFRCxhQUFXQyxPQUFYLEdBQXFCO0FBQ25CLFdBQU8sQ0FDTCxFQUFFQyxNQUFNLGNBQVIsRUFBd0JDLFFBQVEsWUFBaEMsRUFBOENDLE1BQU0sU0FBcEQsRUFBK0RDLE1BQU0sS0FBckUsRUFESyxFQUVMLEVBQUVILE1BQU0sSUFBUixFQUFjQyxRQUFRLGFBQXRCLEVBQXFDQyxNQUFNLFFBQTNDLEVBQXFEQyxNQUFNLEtBQTNELEVBRkssRUFHTCxFQUFFSCxNQUFNLFVBQVIsRUFBb0JDLFFBQVEsVUFBNUIsRUFBd0NDLE1BQU0sTUFBOUMsRUFISyxFQUlMLEVBQUVGLE1BQU0sVUFBUixFQUFvQkMsUUFBUSxXQUE1QixFQUF5Q0MsTUFBTSxRQUEvQyxFQUpLLEVBS0wsRUFBRUYsTUFBTSxjQUFSLEVBQXdCQyxRQUFRLGVBQWhDLEVBQWlEQyxNQUFNLFNBQXZELEVBQWtFQyxNQUFNLEtBQXhFLEVBTEssRUFNTCxFQUFFSCxNQUFNLFdBQVIsRUFBcUJDLFFBQVEsU0FBN0IsRUFBd0NDLE1BQU0sU0FBOUMsRUFOSyxFQU9MLEVBQUVGLE1BQU0sYUFBUixFQUF1QkMsUUFBUSxXQUEvQixFQUE0Q0MsTUFBTSxTQUFsRCxFQVBLLENBQVA7QUFTRDs7QUFFRCxNQUFJRSxFQUFKLEdBQVM7QUFDUCxXQUFPLEtBQUtDLEdBQVo7QUFDRDs7QUFFREMsMEJBQXdCQyxVQUF4QixFQUFvQztBQUNsQyxTQUFLRixHQUFMLEdBQVdFLFdBQVdDLFVBQXRCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkYsV0FBV0csUUFBNUI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVQyxpQkFBVixDQUE0QkwsV0FBV00sVUFBdkMsQ0FBbEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHVCQUFVRixpQkFBVixDQUE0QkwsV0FBV1EsVUFBdkMsQ0FBbEI7QUFDRDs7QUFFRCxNQUFJQyxZQUFKLEdBQW1CO0FBQ2pCLFdBQU8sS0FBS0MsYUFBWjtBQUNEOztBQUVELE1BQUlELFlBQUosQ0FBaUJFLEtBQWpCLEVBQXdCO0FBQ3RCLFNBQUtELGFBQUwsR0FBcUIsQ0FBQyxDQUFDQyxLQUF2QjtBQUNEO0FBbEN3Qjs7a0JBQU5yQixLO0FBcUNyQix5QkFBaUJzQixRQUFqQixDQUEwQnRCLEtBQTFCIiwiZmlsZSI6ImF1ZGlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGVyc2lzdGVudE9iamVjdCB9IGZyb20gJ21pbmlkYic7XG5pbXBvcnQgeyBEYXRlVXRpbHMgfSBmcm9tICdmdWxjcnVtLWNvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpbyB7XG4gIHN0YXRpYyBnZXQgdGFibGVOYW1lKCkge1xuICAgIHJldHVybiAnYXVkaW8nO1xuICB9XG5cbiAgc3RhdGljIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7IG5hbWU6ICdhY2NvdW50Um93SUQnLCBjb2x1bW46ICdhY2NvdW50X2lkJywgdHlwZTogJ2ludGVnZXInLCBudWxsOiBmYWxzZSB9LFxuICAgICAgeyBuYW1lOiAnaWQnLCBjb2x1bW46ICdyZXNvdXJjZV9pZCcsIHR5cGU6ICdzdHJpbmcnLCBudWxsOiBmYWxzZSB9LFxuICAgICAgeyBuYW1lOiAnbWV0YWRhdGEnLCBjb2x1bW46ICdtZXRhZGF0YScsIHR5cGU6ICdqc29uJyB9LFxuICAgICAgeyBuYW1lOiAnZmlsZVBhdGgnLCBjb2x1bW46ICdmaWxlX3BhdGgnLCB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgeyBuYW1lOiAnaXNEb3dubG9hZGVkJywgY29sdW1uOiAnaXNfZG93bmxvYWRlZCcsIHR5cGU6ICdib29sZWFuJywgbnVsbDogZmFsc2UgfSxcbiAgICAgIHsgbmFtZTogJ2Zvcm1Sb3dJRCcsIGNvbHVtbjogJ2Zvcm1faWQnLCB0eXBlOiAnaW50ZWdlcicgfSxcbiAgICAgIHsgbmFtZTogJ3JlY29yZFJvd0lEJywgY29sdW1uOiAncmVjb3JkX2lkJywgdHlwZTogJ2ludGVnZXInIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHVwZGF0ZUZyb21BUElBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICB0aGlzLl9pZCA9IGF0dHJpYnV0ZXMuYWNjZXNzX2tleTtcbiAgICB0aGlzLl9tZXRhZGF0YSA9IGF0dHJpYnV0ZXMubWV0YWRhdGE7XG4gICAgdGhpcy5fY3JlYXRlZEF0ID0gRGF0ZVV0aWxzLnBhcnNlSVNPVGltZXN0YW1wKGF0dHJpYnV0ZXMuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5fdXBkYXRlZEF0ID0gRGF0ZVV0aWxzLnBhcnNlSVNPVGltZXN0YW1wKGF0dHJpYnV0ZXMudXBkYXRlZF9hdCk7XG4gIH1cblxuICBnZXQgaXNEb3dubG9hZGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0Rvd25sb2FkZWQ7XG4gIH1cblxuICBzZXQgaXNEb3dubG9hZGVkKHZhbHVlKSB7XG4gICAgdGhpcy5faXNEb3dubG9hZGVkID0gISF2YWx1ZTtcbiAgfVxufVxuXG5QZXJzaXN0ZW50T2JqZWN0LnJlZ2lzdGVyKEF1ZGlvKTtcbiJdfQ==